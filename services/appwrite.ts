// track the searches made by a user
import { Client, Databases, ID, Query } from 'react-native-appwrite';


const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;


const client = new Client()
     .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
     .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!); // Your project ID

     const database = new Databases(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
   
    try {

       const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
        Query.equal('searchTerm', query)// check if a record of that search has already been stored
       ]);

       console.log(result); // check if a record of that search has already been stored

  // check if a record of that search has already been stored
   if (result.documents.length > 0) {
    const existingMovie = result.documents[0];

    await database.updateDocument(
      DATABASE_ID,
      COLLECTION_ID,
      existingMovie.$id, { 
      count: existingMovie.count + 1  // increment the search count field}
    } 
  ) }
    else {
      await database.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(), {
          searchTerm: query,
          title: movie.title, 
          count: 1, // initialize the count to 1
          movie_id: movie.id, // store the movie ID if needed
          poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}` // store the movie poster URL if needed
        }
      );
      }

  // if a document is found increment the search count field
  // if no document is found create a new document in Appwrite database => 1
    } catch (error) { 
      console.error('Error updating search count:', error);
      throw error; // rethrow the error to handle it in the calling function if needed
    }
}

export const getTrandingMovies = async (): Promise<TrendingMovie[]> | undefined => {
  try {
     
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.limit(5),
      Query.orderDesc('count'), // Order by count in descending order
     ]);

     return result.documents as unknown as TrendingMovie[]; 

  } catch (error) {
    console.error('Error fetching trending movies:', error);
    return undefined; // or handle the error as needed
  }
}
