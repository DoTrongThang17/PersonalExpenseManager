import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- Banner / Carousel state ---
  const bannerImages = [
    'https://picsum.photos/id/1015/1200/400',
    'https://picsum.photos/id/1016/1200/400',
    'https://picsum.photos/id/1018/1200/400',
    'https://picsum.photos/id/1020/1200/400',
  ];
  const [currentSlide, setCurrentSlide] = useState(0);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? bannerImages.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === bannerImages.length - 1 ? 0 : prev + 1));
  };

  // Tự động chuyển ảnh sau mỗi 4 giây
  useEffect(() => {
    const timer = setInterval(nextSlide, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mockResponse = [
          { id: 1, name: 'John Doe', status: 'Active' },
          { id: 2, name: 'Jane Smith', status: 'Inactive' },
          { id: 3, name: 'Nguyen Van A', status: 'Active' },
        ];
        await new Promise((resolve) => setTimeout(resolve, 500));
        setUsers(mockResponse);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      {/* HEADER */}
      <header className="App-header-nav">
        <h1>MY APP</h1>
        <nav>
          <a href="/">Home</a>
          <a href="/link">Link</a>
          <div className="dropdown">
            <button>Options ▾</button>
          </div>
        </nav>
      </header>

      {/* BANNER / CAROUSEL */}
      <section
        className="Banner"
        style={{ backgroundImage: `url(${bannerImages[currentSlide]})` }}
      >
        <button className="carousel-btn left" onClick={prevSlide}>
          ‹
        </button>
        <button className="carousel-btn right" onClick={nextSlide}>
          ›
        </button>
        <div className="carousel-dots">
          {bannerImages.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            ></span>
          ))}
        </div>
      </section>

      {/* CONTENT */}
      <main className="Content">
        {loading ? (
          <p>Đang tải dữ liệu...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>ID</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.id}</td>
                  <td>{user.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>

      {/* FOOTER */}
      <footer className="Footer">
        <p>📍 Hanoi, August 2026</p>
      </footer>
    </div>
  );
}

export default App;