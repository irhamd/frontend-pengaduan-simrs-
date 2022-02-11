import { globalText } from "../services/Text/GlobalText";

export const LogOut = () => {
    Object.values(globalText).forEach(val => {
        sessionStorage.removeItem(val);
    });
}


export const cekSession = () => {
    try {
        if (sessionStorage.getItem('x-auth-user')) {
            alert("ada")
        } else alert("tidak ada")

    } catch (error) {
        alert("gagal")

    }

}

