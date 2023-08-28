import { useContext, useState } from "react";
import { createContext } from "react";

const heroContext = createContext();
const heroContextDispacher = createContext();

function HeroProvider({ children }) {
    const [hero, setHero] = useState(false)
    return (
        <heroContext.Provider value={hero}>
            <heroContextDispacher.Provider value={setHero}>
                {children}
            </heroContextDispacher.Provider>
        </heroContext.Provider>
    )
}

export default HeroProvider

export const useHero = () => useContext(heroContext);
export const useHeroActions = () => useContext(heroContextDispacher);