import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, Image, ActivityIndicator } from 'react-native';
import { useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { FetchMovies } from "@/services/api";
import MovieCard from "@/components/movieCard";
import SearchBar from "@/components/searchBar";
import { updateSearchCount } from '@/services/appwrite';

const SearchScreen = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const { data: movies, loading: moviesLoading, error: moviesError, refetch: loadMovies, reset } = useFetch(() => FetchMovies({
     query: searchQuery
     }), false);

     useEffect(() => {
    
      const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMovies();
      } else {
        reset();
      } }, 800) 

      return () => clearTimeout(timeoutId);
     }, [searchQuery])

     useEffect(() => {
      if(movies?.length > 0 && movies?.[0]) {
        updateSearchCount(searchQuery, movies[0]);
      }  
     }, [movies]);

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />
      <View className="flex-1" >
          <FlatList
            data={movies}
            renderItem={({ item }) => (
              <MovieCard {...item} />
            )}
            keyExtractor={(item) => item.id.toString()}
            numColumns={3}
            columnWrapperStyle={{ justifyContent: 'center', gap: 16, marginVertical: 16 }}
            className="px-5"
            contentContainerStyle={{ paddingBottom: 100 }}
            ListHeaderComponent={
              <>
               <View className='w-full flex-row jusftify-center items-center mt-20'>
               <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
               </View>
               <View className='my-5'>
               <SearchBar 
                onPress={() => router.push("/search")}
                placeholder="Search for a movie"
                value={searchQuery}
                onChangeText={setSearchQuery}
                  />

               </View>
                {moviesLoading && (
                  <ActivityIndicator size='large' color='#0000ff' className="my-3" />  
                )}

                {moviesError && (
                  <Text className="text-red-500 px-5 my-3">{moviesError?.message}</Text>
                )}

                {!moviesLoading && !moviesError && searchQuery.trim() && movies?.length > 0 && (
                  <Text className='text-xl text-white font-bold' >
                    Search Results for{' '}
                    <Text className="text-accent">{searchQuery}</Text>
                    </Text>
                  
                  )}

            </>
            }
            ListEmptyComponent={
            !moviesLoading && !moviesError ? (
              <View className='mt-10 px-5'>
                <Text className='text-center text-gray-500'>
                   {searchQuery.trim() ? `No results found for "${searchQuery}"` : 'Search for a movie'}
                </Text>
              </View>
            ) : null
            }
          />
      </View>
    </View>
  );
}

export default SearchScreen;