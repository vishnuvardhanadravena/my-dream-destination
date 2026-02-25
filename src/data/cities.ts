import { City } from '../types';

export const CITIES: City[] = [
  {
    id: 'delhi',
    name: 'Delhi',
    state: 'Delhi NCR',
    description: 'The capital city of India, a melting pot of history, culture, and modern life.',
    image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=80&w=1000',
    places: [
      {
        id: 'red-fort',
        name: 'Red Fort',
        description: 'A historic fort in the city of Delhi in India that served as the main residence of the Mughal Emperors.',
        history: 'Built in 1639 by the fifth Mughal Emperor Shah Jahan as the palace of his fortified capital Shahjahanabad.',
        entryFee: '₹35 for Indians, ₹500 for foreigners',
        image: 'https://images.unsplash.com/photo-1585123334904-845d60e97b29?auto=format&fit=crop&q=80&w=1000',
        category: 'landmark',
        location: { lat: 28.6562, lng: 77.2410 },
        tags: ['History', 'Architecture', 'UNESCO Site'],
        nearbyPlaces: ['jama-masjid', 'chandni-chowk']
      },
      {
        id: 'karims',
        name: "Karim's",
        description: 'Famous for its Mughlai cuisine, this legendary restaurant near Jama Masjid is a must-visit.',
        image: 'https://images.unsplash.com/photo-1601050633647-8f8f5f4ad473?auto=format&fit=crop&q=80&w=1000',
        category: 'restaurant',
        location: { lat: 28.6507, lng: 77.2334 },
        famousDishes: ['Mutton Burra', 'Chicken Jahangiri', 'Khamiri Roti'],
        tags: ['Mughlai', 'Legendary', 'Non-Veg']
      }
    ]
  },
  {
    id: 'jaipur',
    name: 'Jaipur',
    state: 'Rajasthan',
    description: 'The Pink City, known for its majestic palaces, vibrant culture, and rich history.',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&q=80&w=1000',
    places: [
      {
        id: 'hawa-mahal',
        name: 'Hawa Mahal',
        description: 'The "Palace of Winds" is a high screen wall built so the women of the royal household could observe street festivals.',
        history: 'Built in 1799 by Maharaja Sawai Pratap Singh, designed by Lal Chand Ustad.',
        entryFee: '₹50 for Indians, ₹200 for foreigners',
        image: 'https://images.unsplash.com/photo-1602643163983-ed0babc39797?auto=format&fit=crop&q=80&w=1000',
        category: 'landmark',
        location: { lat: 26.9239, lng: 75.8267 },
        tags: ['Palace', 'Architecture', 'Iconic'],
        nearbyPlaces: ['city-palace', 'jantar-mantar']
      }
    ]
  },
  {
    id: 'mumbai',
    name: 'Mumbai',
    state: 'Maharashtra',
    description: 'The city of dreams, home to Bollywood, colonial architecture, and the Arabian Sea.',
    image: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?auto=format&fit=crop&q=80&w=1000',
    places: [
      {
        id: 'gateway-of-india',
        name: 'Gateway of India',
        description: 'An arch-monument built during the 20th century in Bombay, India.',
        history: 'Erected to commemorate the landing of King-Emperor George V and Queen-Empress Mary at Apollo Bunder.',
        entryFee: 'Free',
        image: 'https://images.unsplash.com/photo-1570160897040-30430ef2015a?auto=format&fit=crop&q=80&w=1000',
        category: 'landmark',
        location: { lat: 18.9220, lng: 72.8347 },
        tags: ['Monument', 'Sea View', 'History'],
        nearbyPlaces: ['taj-mahal-palace', 'colaba-causeway']
      }
    ]
  },
  {
    id: 'varanasi',
    name: 'Varanasi',
    state: 'Uttar Pradesh',
    description: 'One of the oldest living cities in the world, the spiritual heart of India on the banks of the Ganges.',
    image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&q=80&w=1000',
    places: [
      {
        id: 'dashashwamedh-ghat',
        name: 'Dashashwamedh Ghat',
        description: 'The main and most spectacular ghat in Varanasi, famous for its evening Ganga Aarti.',
        history: 'According to legend, Lord Brahma created it to welcome Lord Shiva.',
        entryFee: 'Free',
        image: 'https://images.unsplash.com/photo-1590050752117-23a9d7fc6bbd?auto=format&fit=crop&q=80&w=1000',
        category: 'landmark',
        location: { lat: 25.3068, lng: 83.0103 },
        tags: ['Spiritual', 'Ganges', 'Culture'],
        nearbyPlaces: ['kashi-vishwanath', 'manikarnika-ghat']
      }
    ]
  }
];
