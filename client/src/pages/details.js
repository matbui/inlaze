import { useRouter } from 'next/router';

function Details() {
  const router = useRouter();

  const navigateToHome = () => {
    router.push('/');
  };

  return (
    <div>
      <h1>Details Page</h1>
      <button onClick={navigateToHome}>Go to home</button>
    </div>
  );
}

export default Details;
