import SearchBar from "@/components/searchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Text, View, Image, ScrollView, ActivityIndicator, FlatList } from "react-native";
import { useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { FetchMovies } from "@/services/api";
import MovieCard from "@/components/movieCard";
import { getTrandingMovies } from "@/services/appwrite";
import TrendingCard from "@/components/trendingCard"; // Adjust the path if necessary


export default function Index() {

  const router = useRouter();

  const {
         data: trendingMovies, 
          loading: trendingMoviesLoading,
          error: trendingMoviesError
  } = useFetch(getTrandingMovies);

  const {  
    data: movies, 
    loading: moviesLoading, 
    error: moviesError} 
    = useFetch(() => FetchMovies({ query: '' }));

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />
      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 10, minHeight: "100%" }}>
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />

      {moviesLoading || trendingMoviesLoading ? (
        <ActivityIndicator size='large' color='#0000ff' className="mt-10 self-center" />
      ) : moviesError || trendingMoviesError ? (
        <Text className="text-white">{moviesError?.message || trendingMoviesError?.message}</Text>
      ) : (
        <View className="flex-1 mt-5" >
       <SearchBar 
                onPress={() => router.push("/search")}
                placeholder="Search for a movie"
                  />

                  {trendingMovies && (
                    <View className="mt-10">
                      <Text className="text-lg text-white font-bold mb-3" >Trending Movies</Text>
                    </View>
                  )}
        <>
        <FlatList
        horizontal
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View className="w-4" />}
        className="mb-4 mt-3"
          data={trendingMovies}
          renderItem={({ item, index }) => (
             <TrendingCard movie={item} index={index} />
          )}
          keyExtractor={(item) => item.movie_id.toString()}
        />
        
       <Text className="text-white text-lg font-bold mt-5 mb-3">Latest Movies</Text>
        <FlatList
          data={movies}
          renderItem={({ item }) => (    
              <MovieCard 
              {...item}
              />
          )}
          keyExtractor={(item) => item.id.toString()}

          numColumns={3}
          columnWrapperStyle={{ justifyContent: 'flex-start', gap: 20, paddingRight: 5, marginBottom: 10 }}

          className="mt-2 pb-32"
          scrollEnabled={false}
        />
        </>
        </View>
      )}

      </ScrollView>
    </View>
  );
}
