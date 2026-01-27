// import { Game } from '@/types';

// const API_BASE = 'https://u3iysopa88.execute-api.us-east-1.amazonaws.com';

// // ===== EXISTING GAME API =====
// export const GameAPI = {
//   getAllGames: async (): Promise<Game[]> => {
//     try {
//       const res = await fetch(`${API_BASE}/games`);
//       if (!res.ok) throw new Error('Failed to fetch games');
//       const data = await res.json();
//       return Array.isArray(data) ? data : [data];
//     } catch (error) {
//       console.error('Error fetching games:', error);
//       throw error;
//     }
//   },

//   getGameById: async (gameId: string): Promise<Game> => {
//     try {
//       const res = await fetch(`${API_BASE}/games/${gameId}`);
//       if (!res.ok) throw new Error('Failed to fetch game');
//       return await res.json();
//     } catch (error) {
//       console.error('Error fetching game:', error);
//       throw error;
//     }
//   },

//   createGame: async (gameData: any): Promise<boolean> => {
//     try {
//       const res = await fetch(`${API_BASE}/games`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(gameData)
//       });
//       return res.ok;
//     } catch (error) {
//       console.error('Error creating game:', error);
//       throw error;
//     }
//   },

//   updateGame: async (gameId: string, gameData: Game): Promise<boolean> => {
//     try {
//       const res = await fetch(`${API_BASE}/games/${gameId}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(gameData)
//       });
//       return res.ok;
//     } catch (error) {
//       console.error('Error updating game:', error);
//       throw error;
//     }
//   },

//   deleteGame: async (gameId: string): Promise<boolean> => {
//     try {
//       const res = await fetch(`${API_BASE}/games/${gameId}`, {
//         method: 'DELETE'
//       });
//       return res.ok;
//     } catch (error) {
//       console.error('Error deleting game:', error);
//       throw error;
//     }
//   }
// };

// // ===== NEW COLLECTIONS API =====
// export const CollectionsAPI = {
//   getAllCollections: async (): Promise<any[]> => {
//     try {
//       console.log('🔄 Fetching all collections...');
//       const res = await fetch(`${API_BASE}/collections`);
//       if (!res.ok) throw new Error('Failed to fetch collections');
//       const data = await res.json();
//       console.log('✅ Collections loaded:', Array.isArray(data) ? data.length : 1);
//       return Array.isArray(data) ? data : [data];
//     } catch (error) {
//       console.error('❌ Error fetching collections:', error);
//       throw error;
//     }
//   },

//   getCollectionById: async (collectionId: string): Promise<any> => {
//     try {
//       console.log(`🔄 Fetching collection: ${collectionId}`);
//       const res = await fetch(`${API_BASE}/collections/${collectionId}`);
//       if (!res.ok) throw new Error('Failed to fetch collection');
//       const data = await res.json();
//       console.log('✅ Collection loaded:', data);
//       return data;
//     } catch (error) {
//       console.error('Error fetching collection:', error);
//       throw error;
//     }
//   },

//   createCollection: async (collectionData: any): Promise<boolean> => {
//     try {
//       console.log('🔄 Creating collection...');
//       const res = await fetch(`${API_BASE}/collections`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(collectionData)
//       });
//       console.log(res.ok ? '✅ Collection created successfully' : '❌ Failed to create collection');
//       return res.ok;
//     } catch (error) {
//       console.error('Error creating collection:', error);
//       throw error;
//     }
//   },

//   updateCollection: async (collectionId: string, collectionData: any): Promise<boolean> => {
//     try {
//       console.log(`🔄 Updating collection: ${collectionId}`);
//       const res = await fetch(`${API_BASE}/collections/${collectionId}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(collectionData)
//       });
//       console.log(res.ok ? '✅ Collection updated successfully' : '❌ Failed to update collection');
//       return res.ok;
//     } catch (error) {
//       console.error('Error updating collection:', error);
//       throw error;
//     }
//   },

//   deleteCollection: async (collectionId: string): Promise<boolean> => {
//     try {
//       console.log(`🔄 Deleting collection: ${collectionId}`);
//       const res = await fetch(`${API_BASE}/collections/${collectionId}`, {
//         method: 'DELETE'
//       });
//       console.log(res.ok ? '✅ Collection deleted successfully' : '❌ Failed to delete collection');
//       return res.ok;
//     } catch (error) {
//       console.error('Error deleting collection:', error);
//       throw error;
//     }
//   },

//   // Additional helper methods for collections
//   getCollectionsByType: async (type: string): Promise<any[]> => {
//     try {
//       console.log(`🔄 Fetching collections by type: ${type}`);
//       const res = await fetch(`${API_BASE}/collections?type=${type}`);
//       if (!res.ok) throw new Error(`Failed to fetch collections by type: ${type}`);
//       const data = await res.json();
//       console.log(`✅ Found ${Array.isArray(data) ? data.length : 1} collections of type: ${type}`);
//       return Array.isArray(data) ? data : [data];
//     } catch (error) {
//       console.error(`Error fetching collections by type ${type}:`, error);
//       throw error;
//     }
//   },

//   searchCollections: async (query: string): Promise<any[]> => {
//     try {
//       console.log(`🔄 Searching collections: ${query}`);
//       const res = await fetch(`${API_BASE}/collections/search?q=${encodeURIComponent(query)}`);
//       if (!res.ok) throw new Error('Failed to search collections');
//       const data = await res.json();
//       console.log(`✅ Found ${Array.isArray(data) ? data.length : 1} collections matching: ${query}`);
//       return Array.isArray(data) ? data : [data];
//     } catch (error) {
//       console.error('Error searching collections:', error);
//       throw error;
//     }
//   }
// };

// // ===== EXISTING DASHBOARD API =====
// export const DashboardAPI = {
//   getDashboardStats: async (): Promise<any> => {
//     try {
//       const res = await fetch(`${API_BASE}/games/stats`);
//       if (!res.ok) throw new Error('Failed to fetch dashboard stats');
//       return await res.json();
//     } catch (error) {
//       console.error('Error fetching dashboard stats:', error);
//       throw error;
//     }
//   }
// };

// import { Game } from '@/types';

// const API_BASE = 'https://u3iysopa88.execute-api.us-east-1.amazonaws.com';

// // Helper function to unwrap DynamoDB attribute values
// const unwrap = (obj: any): any => {
//     if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
//         const keys = Object.keys(obj);
//         if (keys.length === 1) {
//             const key = keys[0];
//             if (key === 'S') return obj.S;
//             if (key === 'N') return Number(obj.N);
//             if (key === 'BOOL') return obj.BOOL;
//             if (key === 'L') return obj.L.map(unwrap);
//             if (key === 'M') {
//                 const newObj: { [key: string]: any } = {};
//                 for (const subKey in obj.M) {
//                     newObj[subKey] = unwrap(obj.M[subKey]);
//                 }
//                 return newObj;
//             }
//         }
//     }
//     return obj;
// };

// // Helper function to transform a single DynamoDB item
// const transformItem = (item: any): any => {
//     const unwrappedItem: { [key: string]: any } = {};
//     for (const key in item) {
//         unwrappedItem[key] = unwrap(item[key]);
//     }
//     return unwrappedItem;
// }

// // ===== EXISTING GAME API =====
// export const GameAPI = {
//   getAllGames: async (): Promise<Game[]> => {
//     try {
//       const res = await fetch(`${API_BASE}/games`);
//       if (!res.ok) throw new Error('Failed to fetch games');
//       const data = await res.json();
//       const unwrappedData = (Array.isArray(data) ? data : [data]).map(transformItem);
//       return unwrappedData;
//     } catch (error) {
//       console.error('Error fetching games:', error);
//       throw error;
//     }
//   },

//   getGameById: async (gameId: string): Promise<Game> => {
//     try {
//       const res = await fetch(`${API_BASE}/games/${gameId}`);
//       if (!res.ok) throw new Error('Failed to fetch game');
//       const data = await res.json();
//       return transformItem(data);
//     } catch (error) {
//       console.error('Error fetching game:', error);
//       throw error;
//     }
//   },

//   createGame: async (gameData: any): Promise<boolean> => {
//     try {
//       const res = await fetch(`${API_BASE}/games`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(gameData)
//       });
//       return res.ok;
//     } catch (error) {
//       console.error('Error creating game:', error);
//       throw error;
//     }
//   },

//   updateGame: async (gameId: string, gameData: Game): Promise<boolean> => {
//     try {
//       const res = await fetch(`${API_BASE}/games/${gameId}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(gameData)
//       });
//       return res.ok;
//     } catch (error) {
//       console.error('Error updating game:', error);
//       throw error;
//     }
//   },

//   deleteGame: async (gameId: string): Promise<boolean> => {
//     try {
//       const res = await fetch(`${API_BASE}/games/${gameId}`, {
//         method: 'DELETE'
//       });
//       return res.ok;
//     } catch (error) {
//       console.error('Error deleting game:', error);
//       throw error;
//     }
//   }
// };

// // ===== NEW COLLECTIONS API =====
// export const CollectionsAPI = {
//   getAllCollections: async (): Promise<any[]> => {
//     try {
//       console.log('🔄 Fetching all collections...');
//       const res = await fetch(`${API_BASE}/collections`);
//       if (!res.ok) throw new Error('Failed to fetch collections');
//       const data = await res.json();
//       const unwrappedData = (Array.isArray(data) ? data : [data]).map(transformItem);
//       console.log('✅ Collections loaded:', unwrappedData.length);
//       return unwrappedData;
//     } catch (error) {
//       console.error('❌ Error fetching collections:', error);
//       throw error;
//     }
//   },

//   getCollectionById: async (collectionId: string): Promise<any> => {
//     try {
//       console.log(`🔄 Fetching collection: ${collectionId}`);
//       const res = await fetch(`${API_BASE}/collections/${collectionId}`);
//       if (!res.ok) throw new Error('Failed to fetch collection');
//       const data = await res.json();
//        const unwrappedData = transformItem(data);
//       console.log('✅ Collection loaded:', unwrappedData);
//       return unwrappedData;
//     } catch (error) {
//       console.error('Error fetching collection:', error);
//       throw error;
//     }
//   },

//   createCollection: async (collectionData: any): Promise<boolean> => {
//     try {
//       console.log('🔄 Creating collection...');
//       const res = await fetch(`${API_BASE}/collections`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(collectionData)
//       });
//       console.log(res.ok ? '✅ Collection created successfully' : '❌ Failed to create collection');
//       return res.ok;
//     } catch (error) {
//       console.error('Error creating collection:', error);
//       throw error;
//     }
//   },

//   updateCollection: async (collectionId: string, collectionData: any): Promise<boolean> => {
//     try {
//       console.log(`🔄 Updating collection: ${collectionId}`);
//       const res = await fetch(`${API_BASE}/collections/${collectionId}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(collectionData)
//       });
//       console.log(res.ok ? '✅ Collection updated successfully' : '❌ Failed to update collection');
//       return res.ok;
//     } catch (error) {
//       console.error('Error updating collection:', error);
//       throw error;
//     }
//   },

//   deleteCollection: async (collectionId: string): Promise<boolean> => {
//     try {
//       console.log(`🔄 Deleting collection: ${collectionId}`);
//       const res = await fetch(`${API_BASE}/collections/${collectionId}`, {
//         method: 'DELETE'
//       });
//       console.log(res.ok ? '✅ Collection deleted successfully' : '❌ Failed to delete collection');
//       return res.ok;
//     } catch (error) {
//       console.error('Error deleting collection:', error);
//       throw error;
//     }
//   },

//   // Additional helper methods for collections
//   getCollectionsByType: async (type: string): Promise<any[]> => {
//     try {
//       console.log(`🔄 Fetching collections by type: ${type}`);
//       const res = await fetch(`${API_BASE}/collections?type=${type}`);
//       if (!res.ok) throw new Error(`Failed to fetch collections by type: ${type}`);
//       const data = await res.json();
//       const unwrappedData = (Array.isArray(data) ? data : [data]).map(transformItem);
//       console.log(`✅ Found ${unwrappedData.length} collections of type: ${type}`);
//       return unwrappedData;
//     } catch (error) {
//       console.error(`Error fetching collections by type ${type}:`, error);
//       throw error;
//     }
//   },

//   searchCollections: async (query: string): Promise<any[]> => {
//     try {
//       console.log(`🔄 Searching collections: ${query}`);
//       const res = await fetch(`${API_BASE}/collections/search?q=${encodeURIComponent(query)}`);
//       if (!res.ok) throw new Error('Failed to search collections');
//       const data = await res.json();
//       const unwrappedData = (Array.isArray(data) ? data : [data]).map(transformItem);
//       console.log(`✅ Found ${unwrappedData.length} collections matching: ${query}`);
//       return unwrappedData;
//     } catch (error) {
//       console.error('Error searching collections:', error);
//       throw error;
//     }
//   }
// };

// // ===== EXISTING DASHBOARD API =====
// export const DashboardAPI = {
//   getDashboardStats: async (): Promise<any> => {
//     try {
//       const res = await fetch(`${API_BASE}/games/stats`);
//       if (!res.ok) throw new Error('Failed to fetch dashboard stats');
//       return await res.json();
//     } catch (error) {
//       console.error('Error fetching dashboard stats:', error);
//       throw error;
//     }
//   }
// };

import { Game } from '@/types';

const API_BASE = 'https://u3iysopa88.execute-api.us-east-1.amazonaws.com';

// ===== UPDATED GAME API WITH BETTER ERROR HANDLING =====
export const GameAPI = {
  getAllGames: async (): Promise<Game[]> => {
    try {
      const res = await fetch(`${API_BASE}/games`);
      if (!res.ok) throw new Error('Failed to fetch games');
      const data = await res.json();
      
      // Log the raw response for debugging
      console.log('Raw API response:', data);
      
      // Handle different response structures
      if (Array.isArray(data)) {
        console.log(`✅ Loaded ${data.length} games`);
        return data;
      } else if (data && typeof data === 'object') {
        // Check if data has a property that contains the array
        // Common patterns from AWS Lambda/API Gateway
        if (data.body) {
          // Sometimes AWS API Gateway wraps response in body
          const bodyData = typeof data.body === 'string' ? JSON.parse(data.body) : data.body;
          if (Array.isArray(bodyData)) {
            console.log(`✅ Loaded ${bodyData.length} games from body`);
            return bodyData;
          }
        }
        if (data.Items && Array.isArray(data.Items)) {
          // DynamoDB scan response format
          console.log(`✅ Loaded ${data.Items.length} games from Items`);
          return data.Items;
        }
        if (data.games && Array.isArray(data.games)) {
          console.log(`✅ Loaded ${data.games.length} games from games property`);
          return data.games;
        }
        if (data.data && Array.isArray(data.data)) {
          console.log(`✅ Loaded ${data.data.length} games from data property`);
          return data.data;
        }
        
        // If it's a single game object, wrap it in an array
        if (data.GameId || data.Title || data.id) {
          console.log('⚠️ Single game returned, wrapping in array');
          return [data];
        }
        
        // Log the structure for debugging
        console.error('Unexpected response structure:', Object.keys(data));
        return [];
      }
      
      console.warn('⚠️ Empty or invalid response, returning empty array');
      return [];
    } catch (error) {
      console.error('Error fetching games:', error);
      throw error;
    }
  },

  getGameById: async (gameId: string): Promise<Game> => {
    try {
      const res = await fetch(`${API_BASE}/games/${gameId}`);
      if (!res.ok) throw new Error('Failed to fetch game');
      return await res.json();
    } catch (error) {
      console.error('Error fetching game:', error);
      throw error;
    }
  },

  createGame: async (gameData: any): Promise<boolean> => {
    try {
      const res = await fetch(`${API_BASE}/games`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(gameData)
      });
      return res.ok;
    } catch (error) {
      console.error('Error creating game:', error);
      throw error;
    }
  },

  updateGame: async (gameId: string, gameData: Game): Promise<boolean> => {
    try {
      const res = await fetch(`${API_BASE}/games/${gameId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(gameData)
      });
      return res.ok;
    } catch (error) {
      console.error('Error updating game:', error);
      throw error;
    }
  },

  deleteGame: async (gameId: string): Promise<boolean> => {
    try {
      const res = await fetch(`${API_BASE}/games/${gameId}`, {
        method: 'DELETE'
      });
      return res.ok;
    } catch (error) {
      console.error('Error deleting game:', error);
      throw error;
    }
  }
};

// ===== Keep your existing CollectionsAPI and DashboardAPI code below =====
// [Rest of your CollectionsAPI and DashboardAPI code stays the same]