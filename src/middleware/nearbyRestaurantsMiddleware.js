//Unused for now, but I believe Jordan will have us write our own middleware to manage the state.

export const nearbyRestaurantsMiddleware = (store)=>{
    return (next)=>{
        return async(action)=>{
            switch (action.type) {
              
                    
                default:
                    next(action)
                    break;
            }
        }
    }
}