// import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Client,
  Account,
  ID,
  Avatars,
  Databases,
  Query,
} from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.react-native-application.aora",
  projectId: "670566370018f3fe58b5",
  databaseId: "6705690b0009c13d66fb",
  userCollectionId: "67056969002d306881d3",
  videoCollectionId: "670569bd000151915eb8",
  storageId: "67056b60003b0a4443c0",
};

// let client: Client;
// let account: Account;

// initialize your react native sdk
const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);
const avatar = new Avatars(client);
const databases = new Databases(client);

export async function register(email, password, username) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;

    //creating avatar url for user
    const avatarUrl = avatar.getInitials(username);
    await login(email, password);

    //creating a new user for databases
    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        password,
        avatar: avatarUrl,
      }
    );
    return newUser;
  } catch (error) {
    console.log("appwrite config :: register :: error", error);
    throw new Error(error);
  }
}

export async function login(email, password) {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    // await AsyncStorage.setItem("appwrite_session", JSON.stringify(session));

    return session;
  } catch (error) {
    console.log("appwrite config :: login :: error", error);
  }
}

export const getCurrentUser = async () => {
  try {
    //Ensure there is an active session
    const session = await account.getSession("current");
    if (!session) throw new Error("No active session found.");

    //Getting the current userAccount for logged in user.
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;

    //it will list all the documents present in the database of particular collection
    //Then the query.equal will find the only document with accountid equals currentAccount of some id.
    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );
    if (!currentUser) throw Error;
    return currentUser.documents[0];
  } catch (error) {
    console.log("appwrite config :: getCurrentUser :: Error", error);
  }
};

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId
    );
    // console.log("appwrite posts: ", posts.documents);
    return posts.documents;
  } catch (error) {
    console.log("appwrite config :: getAllPosts :: Error", error);
  }
};

export const getLatestPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.orderDesc("$createdAt", Query.limit(7))]
    );
    // console.log("appwrite posts: ", posts.documents);
    return posts.documents;
  } catch (error) {
    console.log("appwrite config :: getAllPosts :: Error", error);
  }
};

export const searchPosts = async (query) => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.search("title", query)]
    );
    // console.log("appwrite posts: ", posts.documents);
    return posts.documents;
  } catch (error) {
    console.log("appwrite config :: SearchPosts :: Error", error);
  }
};

export const getUserInfo = async (userId) => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.equal("creator", userId)]
    );
    // console.log("appwrite posts: ", userId);
    return posts.documents;
  } catch (error) {
    console.log("appwrite config :: SearchPosts :: Error", error);
  }
};

export const signOut = async () => {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (error) {
    console.log("appwrite config :: signOut :: Error", error);
  }
};
