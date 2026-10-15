import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

export const useAuth = () => useContext(AuthContext);
export const useCart = () => useContext(CartContext);
