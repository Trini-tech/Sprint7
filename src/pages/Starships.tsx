import { useState, useEffect } from 'react';
interface Starship {
  name: string;
  model: string;
}

function fetchStarships(): Promise<Starship[]> {
  const url = 'https://swapi.dev/api/starships/?page=2';

  return fetch(url)
    .then((response) => response.json())
    .then((data) =>
      data.results.map((result: any) => ({
        name: result.name,
        model: result.model,
      })),
    )
    .catch((error) => {
      console.error('Error:', error);
      throw error;
    });
}

export default function Starships() {
  const [starshipsArray, setStarshipsArray] = useState<Starship[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const starships = await fetchStarships();
        setStarshipsArray(starships);
      } catch (error) {
        console.error('Error fetching starships:', error);
      }
    }

    fetchData();
  }, []); // El array vacío asegura que useEffect se ejecute solo una vez al montar el componente
  return (
    <main className="starships-list w-full">
      <ul>
        {starshipsArray.map(({ name, model }, index) => (
          <li key={index} className="p-3 w-full">
            <div className="card w-full bg-primary text-primary-content">
              <div className="card-body">
                <h3 className="card-title">{name}</h3>
                <p>{model}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
