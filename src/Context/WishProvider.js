import { createContext, useContext, useReducer } from "react";
import WishReducer from "./WishReducer";

const WishContext = createContext();
const WishContextDispatcher = createContext();
const initialState = {
    wish: []
}
const WishProvider = ({ children }) => {
    const [wish, dispatch] = useReducer(WishReducer, initialState)
    return (
        <WishContext.Provider value={wish}>
            <WishContextDispatcher.Provider value={dispatch}>
                {children}
            </WishContextDispatcher.Provider>
        </WishContext.Provider>
    );
}

export default WishProvider;

export const useWish = () => useContext(WishContext);
export const useWishActions = () => useContext(WishContextDispatcher)

