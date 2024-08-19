import { useRouter } from 'next/router';
import Image from "next/image";
import styles from "../app/page.module.css";
import ModalLogin from '@/app/components/ModalLogin';
import { useContext, useState } from 'react';
import { AuthContext } from '@/app/context/LoginContext';
import Navbar from '@/app/components/Navbar';
import MovieTable from '@/app/components/MovieTable';

export default function Home() {
    const { isAuthenticated } = useContext(AuthContext);
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(true);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div style={homeContainer}>
            <Navbar />
            <main style={mainStyle}>
                <div style={descriptionStyle}>
                    <MovieTable />
                </div>
                <div style={centerStyle}>
                    <Image
                        className={styles.logo}
                        src="/next.svg"
                        alt="Next.js Logo"
                        width={180}
                        height={37}
                        priority
                    />
                </div>
                <ModalLogin isOpen={isAuthenticated} onClose={closeModal} />
            </main>
        </div>
    );
}

const homeContainer = {
    backgroundColor: '#121212', 
    color: '#EAEAEA',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
};

const mainStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '1rem',
};

const descriptionStyle = {
    marginBottom: '2rem',
};

const centerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '2rem',
};

