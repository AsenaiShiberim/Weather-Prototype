
import Link from 'next/link'; 


export default function HomeScreen() {
  const backgroundImage = "url('https://images.unsplash.com/photo-1534996858221-380b92700493?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')";

  const backgroundImageStyle = {
    backgroundImage: backgroundImage,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column', 
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
  };


  return (
    <div style={backgroundImageStyle}>
      <h1 className='title'>GeoWeatherMapper</h1>
      <nav className='navbar'>
        <ul>
          <li> 
           
            <Link href="components">
              Emissions Data
            </Link>

            <Link href="/AQHI">
              CO2 Graph
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
//npm install react-chartjs-2 chart.js//
