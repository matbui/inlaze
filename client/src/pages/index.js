import { useRouter } from 'next/router';

import Image from "next/image";
import styles from "../app/page.module.css";
import ModalLogin from '@/app/components/ModalLogin';
import { useContext, useState } from 'react';
import { AuthContext } from '@/app/context/LoginContext';


export default function Home() {
    const { isAuthenticated, logout } = useContext(AuthContext);
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(true);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const navigateToDetails = () => {
        router.push('/details');
      };
    return (
        <main className={styles.main}>
        <div className={styles.description}>
            <p>
            Get started by editing&nbsp;
            <code className={styles.code}>src/app/page.js</code>
            </p>
            <div>
            <a
                href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
            >
                By{" "}
                <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                className={styles.vercelLogo}
                width={100}
                height={24}
                priority
                />
            </a>
            </div>
        </div>

        <div className={styles.center}>
            <Image
            className={styles.logo}
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
            />
        </div>

        <div className={styles.grid}>
            <button onClick={()=>logout()} >Go to home</button>
        </div>

        <ModalLogin isOpen={isAuthenticated} onClose={closeModal}/>
        </main>
    );
}
