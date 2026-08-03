import mongoose from 'mongoose';
import { User } from '../models/User.js';
import { Contact } from '../models/Contact.js';
import { Volunteer } from '../models/Volunteer.js';
import { Program } from '../models/Program.js';
import { Event } from '../models/Event.js';
import { Gallery } from '../models/Gallery.js';
import { News } from '../models/News.js';
import { Testimonial } from '../models/Testimonial.js';
import { Settings } from '../models/Settings.js';

export const seedDatabaseIfEmpty = async () => {
  console.log('🔄 Verifying MongoDB Atlas Collections & Seeding Production Sample Data...');
  if (mongoose.connection.readyState !== 1) {
    console.log('⚠️ Mongoose connection not ready for seeding.');
    return;
  }

  try {
    // 1. Admin User
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      await User.create({
        name: 'Sri Susheela Admin',
        email: 'admin@srisusheelatrust.org',
        passwordHash: '$2a$10$7vN3gH8T3J8n3U4jV.r2v.kQ3X/7J7Q7J7Q7J7Q7J7Q7J7Q7J7Q7',
        role: 'admin',
      });
      console.log('🌱 Seeded Admin User into MongoDB Atlas');
    }

    // 2. Programs
    const progCount = await Program.countDocuments();
    if (progCount < 4) {
      await Program.deleteMany({});
      await Program.insertMany([
        {
          id: 'annadhanam',
          title: 'Daily Annadhanam Initiative',
          titleTa: 'தினசரி அன்னதானத் திட்டம்',
          shortDesc: 'Providing 1,500+ nutritious, freshly cooked meals daily to underprivileged families and hospital attendants.',
          shortDescTa: 'ஏழை எளியோர் மற்றும் மருத்துவமனை உதவியாளர்களுக்கு தினமும் 1,500+ சத்தான உணவு வழங்கப்படுகிறது.',
          description: 'Food is the fundamental right of every human being. Through our Daily Annadhanam Initiative, we prepare and distribute over 1,500 hygienic, freshly cooked meals every single day across Chennai and surrounding rural districts.',
          category: 'annadhanam',
          iconName: 'Utensils',
          imageUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1200&q=80',
          beneficiariesCount: '500,000+ Meals Served',
          features: ['Hygienic Mobile Kitchens', 'Special Festival Feeds', 'Hospital Ward Meal Distribution', 'Zero Food Waste Protocol'],
        },
        {
          id: 'education',
          title: 'Vidya Jyothi Free Education Scheme',
          titleTa: 'வித்யா ஜோதி இலவசக் கல்வித் திட்டம்',
          shortDesc: 'Empowering deserving rural students with full academic scholarships, learning kits, laptops, and digital labs.',
          shortDescTa: 'மாணவர்களுக்கு கல்வி உதவித்தொகை, கற்றல் உபகரணங்கள் மற்றும் கணினி பயிற்சி வழங்கப்படுகிறது.',
          description: 'Education breaks the cycle of poverty. Vidya Jyothi provides full academic scholarships, textbooks, uniforms, evening tuition centers, and coding labs for deserving students in government and rural schools.',
          category: 'education',
          iconName: 'GraduationCap',
          imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
          beneficiariesCount: '1,200+ Scholars Supported',
          features: ['Full College Fee Grants', 'Laptop & Tablet Distribution', 'Evening After-School Tuition', 'Career Guidance Seminars'],
        },
        {
          id: 'healthcare',
          title: 'Arogya Care Free Medical Camps',
          titleTa: 'ஆரோக்கியா இலவச மருத்துவக் முகாம்கள்',
          shortDesc: 'Organizing rural multi-specialty health checkups, free eye surgeries, diagnostic tests, and life-saving medicines.',
          shortDescTa: 'கிராமப்புறங்களில் இலவச பன்முக மருத்துவ முகாம்கள் மற்றும் இலவச மருந்துகள் வழங்கல்.',
          description: 'Healthcare must reach every doorstep. Through Arogya Care, our team of dedicated doctors and volunteers organize weekly medical camps in remote villages, offering free consultations, blood tests, eye surgeries, and medicines.',
          category: 'healthcare',
          iconName: 'Stethoscope',
          imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
          beneficiariesCount: '25,000+ Patients Treated',
          features: ['Free Diagnostic Blood Tests', 'Cataract & Eye Surgery Assistance', 'Free Prescription Medicines', 'Mobile Ambulance Service'],
        },
        {
          id: 'elderly',
          title: 'Anbu Illam Senior Citizen Home',
          titleTa: 'அன்பு இல்லம் முதியோர் காப்பகம்',
          shortDesc: 'Offering compassionate shelter, nutritious food, medical care, and dignity to abandoned senior citizens.',
          shortDescTa: 'ஆதரவற்ற முதியோருக்கு கண்ணியமான உணவு, இருப்பிடம் மற்றும் மருத்துவப் பராமரிப்பு வழங்கப்படுகிறது.',
          description: 'Anbu Illam provides a warm, loving home for abandoned and homeless elderly citizens. We ensure 24/7 nursing care, nutritious meals, spiritual retreats, and emotional companionship.',
          category: 'elderly',
          iconName: 'HeartHandshake',
          imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=80',
          beneficiariesCount: '150+ Elders Sheltered',
          features: ['24/7 On-Call Nursing Care', 'Nutritious Customized Meals', 'Recreational & Yoga Programs', 'Dignified Lifetime Protection'],
        },
      ]);
      console.log('🌱 Seeded Formal Welfare Programs into MongoDB Atlas');
    }

    // 3. Events
    const evtCount = await Event.countDocuments();
    if (evtCount < 3) {
      await Event.deleteMany({});
      await Event.insertMany([
        {
          id: 'EVT-101',
          title: 'Mega Annadhanam Drive & Winter Care Distribution',
          titleTa: 'மெகா அன்னதானம் மற்றும் போர்வை விநியோகம்',
          date: 'August 15, 2026',
          time: '09:00 AM - 02:00 PM',
          location: 'Uthandi Community Grounds, Chennai',
          locationTa: 'உத்தண்டி சமுதாயக் கூடம், சென்னை',
          shortDesc: 'Join us on Independence Day for a massive meal drive and winter blanket care distribution for 2,000 families.',
          category: 'Annadhanam',
          imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80',
          isUpcoming: true,
          registeredCount: 420,
          status: 'Upcoming',
        },
        {
          id: 'EVT-102',
          title: 'Free Multi-Specialty Health & Eye Surgery Camp',
          titleTa: 'இலவச பன்முக மருத்துவ மற்றும் கண் அறுவை சிகிச்சை முகாம்',
          date: 'September 05, 2026',
          time: '08:30 AM - 04:00 PM',
          location: 'Government Higher Secondary School Auditorium, Thiruvallur',
          locationTa: 'அரசு மேல்நிலைப்பள்ளி அரங்கம், திருவள்ளூர்',
          shortDesc: 'Free Cardiology, Ophthalmology, Pediatrics, and Orthopedic checkups along with free glasses and medicines.',
          category: 'Healthcare',
          imageUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80',
          isUpcoming: true,
          registeredCount: 290,
          status: 'Upcoming',
        },
        {
          id: 'EVT-103',
          title: 'Annual Vidya Jyothi Laptop & Scholarship Ceremony',
          titleTa: 'ஆண்டு வித்யா ஜோதி மடிக்கணினி மற்றும் கல்வி விருது விழா',
          date: 'July 10, 2026',
          time: '10:00 AM - 01:00 PM',
          location: 'Sri Susheela Trust Auditorium, Chennai',
          locationTa: 'ஸ்ரீ சுசீலா அறக்கட்டளை அரங்கம், சென்னை',
          shortDesc: 'Distributed 100 laptops and merit awards to meritorious college scholars from rural farming communities.',
          category: 'Education',
          imageUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80',
          isUpcoming: false,
          registeredCount: 850,
          status: 'Completed',
        },
      ]);
      console.log('🌱 Seeded Formal Events into MongoDB Atlas');
    }

    // 4. Gallery
    const galCount = await Gallery.countDocuments();
    if (galCount < 6) {
      await Gallery.deleteMany({});
      await Gallery.insertMany([
        {
          id: 'GAL-001',
          title: 'Daily Annadhanam Meal Preparation in Mobile Kitchen',
          category: 'annadhanam',
          type: 'image',
          mediaUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1200&q=80',
          description: 'Our dedicated culinary team preparing freshly cooked, hygienic vegetarian meals for 1,500 people daily.',
        },
        {
          id: 'GAL-002',
          title: 'Vidya Jyothi Digital Lab & Laptop Handover',
          category: 'education',
          type: 'image',
          mediaUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
          description: 'Rural high school students receiving free laptops and coding learning kits from Trust trustees.',
        },
        {
          id: 'GAL-003',
          title: 'Rural Healthcare Checkup & Eye Screening Camp',
          category: 'healthcare',
          type: 'image',
          mediaUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
          description: 'Specialist doctors examining senior citizens and providing free prescription spectacles.',
        },
        {
          id: 'GAL-004',
          title: 'Anbu Illam Elderly Care Home Cultural Evening',
          category: 'events',
          type: 'image',
          mediaUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=80',
          description: 'Senior citizens celebrating festive music and traditional meals with volunteers.',
        },
        {
          id: 'GAL-005',
          title: 'Emergency Food Package Distribution Drive',
          category: 'annadhanam',
          type: 'image',
          mediaUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80',
          description: 'Distributing ration kits and warm blankets to vulnerable families during monsoon season.',
        },
        {
          id: 'GAL-006',
          title: 'Tree Plantation & Environmental Greenery Drive',
          category: 'events',
          type: 'image',
          mediaUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80',
          description: 'Planting 1,000 native saplings along Uthandi coastal roads with youth volunteers.',
        },
      ]);
      console.log('🌱 Seeded Formal Gallery into MongoDB Atlas');
    }

    // 5. News
    const newsCount = await News.countDocuments();
    if (newsCount < 2) {
      await News.deleteMany({});
      await News.insertMany([
        {
          id: 'news-1',
          title: 'Sri Susheela Trust Honored with State Excellence Award for Outstanding Annadhanam Services',
          titleTa: 'ஸ்ரீ சுசீலா அறக்கட்டளைக்கு மாநில சிறந்த சமூக சேவை விருது',
          publishedDate: 'June 20, 2026',
          category: 'Recognition',
          excerpt: 'The Honorable State Minister presented Sri Susheela Trust with the Social Excellence Award 2026 for providing over 500,000 free meals.',
          content: 'Sri Susheela Trust has been bestowed with the State Social Excellence Award 2026 in recognition of its unremitting dedication to eradicating hunger through its Daily Annadhanam Initiative across Tamil Nadu.',
          imageUrl: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=1200&q=80',
          readTime: '3 min read',
          author: 'Official Editorial Board',
        },
        {
          id: 'news-2',
          title: 'New Digital Learning Computer Lab Inaugurated in Kanchipuram District School',
          titleTa: 'காஞ்சிபுரம் கிராமப்புற பள்ளியில் புதிய டிஜிட்டல் கற்றல் மையம்',
          publishedDate: 'May 12, 2026',
          category: 'Education',
          excerpt: 'Equipped with 25 high-speed computers, smart boards, and fiber internet for 600 underprivileged students.',
          content: 'Continuing our promise of democratizing education, Sri Susheela Trust inaugurated its 12th Vidya Jyothi Digital Learning Center at Government School Kanchipuram, empowering rural youth with modern tech skills.',
          imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
          readTime: '4 min read',
          author: 'Vidya Jyothi Media Team',
        },
      ]);
      console.log('🌱 Seeded Formal News into MongoDB Atlas');
    }

    // 6. Testimonials
    const testCount = await Testimonial.countDocuments();
    if (testCount < 3) {
      await Testimonial.deleteMany({});
      await Testimonial.insertMany([
        {
          id: 't-1',
          name: 'R. Lakshmi Ammal',
          role: 'Anbu Illam Senior Resident (Age 74)',
          quote: 'After losing my family, I felt completely alone. Sri Susheela Trust gave me not just shelter, but a respectful home filled with love, medical care, and companionship.',
          avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
          rating: 5,
        },
        {
          id: 't-2',
          name: 'K. Karthikeyan',
          role: 'Vidya Jyothi Scholar (Engineering Student)',
          quote: 'Without the full academic scholarship and laptop from Sri Susheela Trust, my dream of becoming a Software Engineer would have remained unfulfilled.',
          avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
          rating: 5,
        },
        {
          id: 't-3',
          name: 'Dr. S. Sundaram, MD',
          role: 'Chief Medical Camp Officer',
          quote: 'I have conducted health camps for years, but the discipline, warmth, and transparency of Sri Susheela Trust team is truly world-class.',
          avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
          rating: 5,
        },
      ]);
      console.log('🌱 Seeded Formal Testimonials into MongoDB Atlas');
    }

    // 7. Contact Inquiries Sample
    const contactCount = await Contact.countDocuments();
    if (contactCount < 3) {
      await Contact.deleteMany({});
      await Contact.insertMany([
        {
          id: 'CNT-101',
          name: 'Kavitha Ramakrishnan',
          email: 'kavitha.ram@gmail.com',
          phone: '+91 98401 23456',
          subject: 'Annadhanam Donation',
          message: 'Hello, I would like to sponsor Sunday lunch Annadhanam for 200 people at your Uthandi center.',
          status: 'Pending',
          createdAt: new Date(Date.now() - 3600000 * 5),
        },
        {
          id: 'CNT-102',
          name: 'Santhosh Kumar',
          email: 'santhosh.k@techcorp.in',
          phone: '+91 97908 76543',
          subject: 'Corporate CSR',
          message: 'We are looking to partner with Sri Susheela Trust for our Q3 CSR education kit distribution drive.',
          status: 'Replied',
          adminNotes: 'Spoke on phone, scheduled meeting for Thursday.',
          createdAt: new Date(Date.now() - 3600000 * 24),
        },
        {
          id: 'CNT-103',
          name: 'Meena Sundaram',
          email: 'meena.s@yahoo.co.in',
          phone: '+91 94440 98765',
          subject: 'General Inquiry',
          message: 'Can I visit the trust headquarters this Saturday evening between 4 PM and 6 PM?',
          status: 'Read',
          createdAt: new Date(Date.now() - 3600000 * 48),
        },
      ]);
      console.log('🌱 Seeded Formal Contact Inquiries into MongoDB Atlas');
    }

    // 8. Volunteers Sample
    const volCount = await Volunteer.countDocuments();
    if (volCount < 3) {
      await Volunteer.deleteMany({});
      await Volunteer.insertMany([
        {
          id: 'VOL-301',
          name: 'Vikram Mehta',
          email: 'vikram@example.com',
          phone: '+91 98765 43210',
          role: 'Event Coordinator',
          joinedDate: '2026-01-15',
          status: 'Active',
        },
        {
          id: 'VOL-302',
          name: 'Neha Verma',
          email: 'neha@example.com',
          phone: '+91 98765 12345',
          role: 'Medical Volunteer',
          joinedDate: '2026-03-20',
          status: 'Active',
        },
      ]);
      console.log('🌱 Seeded Formal Volunteers into MongoDB Atlas');
    }

    // 9. Settings Sample
    const settingsCount = await Settings.countDocuments();
    if (settingsCount === 0) {
      await Settings.create({
        key: 'TRUST_INFO',
        data: {
          name: 'Sri Susheela Trust',
          nameTa: 'ஸ்ரீ சுசீலா அறக்கட்டளை',
          founder: 'Iyappan R',
          email: 'srisusilaarakattalai0088@gmail.com',
          phonePrimary: '+91 97105 37506',
          address: {
            street: '158 Thiruvika Street',
            area: 'Uthandi',
            city: 'Chennai',
            state: 'Tamil Nadu',
            pincode: '60119',
          },
        },
      });
      console.log('🌱 Seeded Settings into MongoDB Atlas');
    }

    console.log('✨ All 9 MongoDB Atlas Collections Seeded Successfully!');
  } catch (err) {
    console.error('Error seeding MongoDB Atlas:', err);
  }
};
