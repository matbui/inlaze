import axios from "axios";
import Swal from "sweetalert2";
import env from "../../../env-local.js";
import { useRouter } from 'next/router';

export const useFetch = () => {
    const router = useRouter();

    // Crear instancia de Axios
    const instance = axios.create({
        baseURL: env.urlBackend, // Asegúrate de que `env.urlBackend` esté correctamente configurado para apuntar al servidor NestJS
        headers: {
            Authorization: typeof window !== 'undefined' && localStorage.getItem("token") 
                            ? `Bearer ${localStorage.getItem("token")}` 
                            : ""
        }
    });

    const logout = () => {
        if (localStorage.getItem('token')){
            localStorage.clear();
            Swal.fire({
                title: "",
                text: "Session Expired",
                icon: "info"
            })
        }else{
            Swal.fire({
                title: "",
                text: "Incorrect username or password",
                icon: "error"
            })
        }
    };

    const notPermissions = () => {
        Swal.fire({
            title: "",
            text: "Not permission",
            icon: "warning"
        });
    };

    const post = async (url, body = {}, params = {}) => {
        params = new URLSearchParams(params).toString();
        url = params !== "" ? `${url}?${params}` : url;
        try {
            const response = await instance.post(url, body);
            return response;
        } catch (error) {
            handleApiError(error);
            return error.response
        }
    };

    const put = async (url, body = {}, params = {}) => {
        params = new URLSearchParams(params).toString();
        url = params !== "" ? `${url}?${params}` : url;
        try {
            const response = await instance.put(url, body);
            return response.data;
        } catch (error) {
            handleApiError(error);
        }
    };

    const get = async (url, params = {}) => {
        params = new URLSearchParams(params).toString();
        url = params !== "" ? `${url}?${params}` : url;
        try {
            const response = await instance.get(url);
            return response.data;
        } catch (error) {
            handleApiError(error);
        }
    };

    const deleteMethod = async (url, body = {}, params = {}) => {
        params = new URLSearchParams(params).toString();
        url = params !== "" ? `${url}?${params}` : url;
        try {
            const response = await instance.delete(url, { data: body });
            return response.data;
        } catch (error) {
            handleApiError(error);
        }
    };

    const handleApiError = (error) => {
        if (error.response) {
            // Manejo de errores según el código de estado
            const { status } = error.response;
            if (status === 401) { // No autorizado
                logout();
            } else if (status === 403) { // Sin permisos
                notPermissions();
            } else if (status === 500) { // Error del servidor
                Swal.fire({
                    title: "Error",
                    text: "Something went wrong. Please try again later.",
                    icon: "error"
                });
            }
        } else {
            // Error de red o de cliente
            console.log(error);
            Swal.fire({
                title: "Error",
                text: "Network error. Please check your connection.",
                icon: "error"
            });
        }
    };

    return { post, put, get, deleteMethod };
};