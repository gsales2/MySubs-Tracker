import { auth, db } from "./firebase-config.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const userDisplayNameTop = document.getElementById("user-display-name-top");
const userDisplayNameWelcome = document.getElementById("user-display-name");
const btnLogout = document.getElementById("btn-logout");

onAuthStateChanged(auth, async (user) => {
    if (user) {
        console.log("1. Usuário autenticado:", user.uid);
        
        try {
            const docRef = doc(db, "users", user.uid);
            console.log("2. Buscando documento no Firestore...");
            
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const dados = docSnap.data();
                console.log("3. Dados encontrados no Firestore:", dados);
                
                const nomeFinal = dados.nome ? dados.nome.split(' ')[0] : "Usuário";
                
                if(userDisplayNameTop) userDisplayNameTop.innerText = nomeFinal;
                if(userDisplayNameWelcome) userDisplayNameWelcome.innerText = nomeFinal;
                
                console.log("4. Interface atualizada com sucesso!");
            } else {
                console.warn("3. Documento não existe. Usando nome do perfil social.");
                const nomeSocial = (user.displayName || user.email).split(' ')[0];
                if(userDisplayNameTop) userDisplayNameTop.innerText = nomeSocial;
                if(userDisplayNameWelcome) userDisplayNameWelcome.innerText = nomeSocial;
            }
        } catch (error) {
            console.error("ERRO NO FIRESTORE:", error);
            if(userDisplayNameWelcome) userDisplayNameWelcome.innerText = user.email;
        }
    } else {
        console.log("Nenhum usuário logado. Redirecionando...");
        window.location.href = "index.html";
    }
});

if(btnLogout) {
    btnLogout.addEventListener("click", () => signOut(auth).then(() => window.location.href = "index.html"));
}