export const users = [
  {
    id: 1,
    name: "John",
    profilePic: "./img/pfp1.jpg", // path or URL to profile picture
    bio: "Tech enthusiast and coder. Loves exploring new tools and contributing to open source.",
  },
  {
    id: 2,
    name: "Hannah",
    profilePic: "./img/pfp2.jpg",
    bio: "Digital artist experimenting with generative AI. Passionate about collaboration and creative coding.",
  },
  {
    id: 3,
    name: "Lory",
    profilePic: "./img/pfp3.jpg",
    bio: "Frontend developer learning TypeScript. Always chasing bugs and sharing coding humor.",
  },
  {
    id: 4,
    name: "Alfie",
    profilePic: "./img/pfp4.jpg",
    bio: "Amazing Bootcamp lecturer focused on teaching, productivity, and healthy coding habits.",
  },
];

export const messages = [
  {
    id: 1,
    from: "John",
    title: "Exploring new tech",
    date: "2025-11-20",
    message: "Hey, I just tried out a new AI tool. You should check it out!",
    isRead: true,
  },
  {
    id: 2,
    from: "Hannah",
    title: "Art collab idea",
    date: "2025-11-21",
    message: "Would you be up for collaborating on a digital art project?",
    isRead: true,
  },
  {
    id: 3,
    from: "Lory",
    title: "Quick hello",
    date: "2025-11-25",
    message: "Just wanted to say hi and see how you're doing!",
    isRead: false,
  },
  {
    id: 4,
    from: "Alfie",
    title: "Friday Presentation",
    date: "2025-11-26",
    message:
      "Hi guys, remember your presentations begin at 1:45 on Friday. Good luck! 💪",
    isRead: false,
  },
];

export const posts = [
  {
    id: 1,
    userId: 1, // John
    title: "Exploring new tech",
    date: "2025-11-20",
    content:
      "I just tried out a new AI tool. It’s amazing for productivity! The interface is intuitive and the results are impressive.\n\nIn my experience, integrating it into my workflow has saved me hours each week. Highly recommend giving it a try if you’re into automation.",
  },
  {
    id: 2,
    userId: 1, // John
    title: "React vs NextJS",
    date: "2025-11-22",
    content:
      "NextJS makes routing and SSR so much easier compared to plain React. The documentation is clear and the community is super helpful.\n\nIf you’re building a scalable app, NextJS is definitely worth considering for its performance and flexibility.",
  },
  {
    id: 3,
    userId: 2, // Hannah
    title: "Digital Art Collaboration",
    date: "2025-11-21",
    content:
      "Thinking of combining abstract shapes with generative AI art. Who’s in? I’ve been experimenting with different color palettes and styles.\n\nLet’s brainstorm ideas and maybe set up a virtual gallery to showcase our work together!",
  },
  {
    id: 4,
    userId: 4, // Alfie
    title: "Presentation Tips",
    date: "2025-11-27",
    content:
      "Keep slides simple, practice timing, and engage your audience with questions.\n\nRemember, confidence comes from preparation. If you need feedback, I’m happy to review your slides before Friday.",
  },
  {
    id: 5,
    userId: 3, // Lory
    title: "I secretly suck at JavaScript.",
    date: "2025-11-20",
    content:
      "But I use React so it doesn't really matter. Teehee🫠\n\nAnyone else feel like they’re just winging it sometimes? Let’s share our favorite JS hacks!",
  },
  {
    id: 6,
    userId: 1, // John
    title: "Why did the React developer stay calm?",
    date: "2025-11-22",
    content:
      "Because they knew how to keep their state under control.\n\nSeriously though, state management can be tricky. What’s your go-to solution?",
  },
  {
    id: 7,
    userId: 2, // Hannah
    title: "Heard a joke today...",
    date: "2025-11-28",
    content:
      "“I told my React app a joke… but it didn’t laugh. Guess it needed to re-render first.”\n\nI’ll be here all week, folks! Drop your best dev jokes below.",
  },
  {
    id: 8,
    userId: 4, // Alfie
    title: "Why did the React component feel sad?",
    date: "2025-11-27",
    content:
      "It didn’t get any props.\n\nProps to everyone working hard on their projects this week!",
  },
  {
    id: 9,
    userId: 2, // Hannah
    title: "Weekend Inspiration",
    date: "2025-11-28",
    content:
      "This weekend, I’m planning to dive into some new creative coding projects.\n\nIf anyone wants to join a brainstorming session, let me know! Collaboration always sparks the best ideas.",
  },
  {
    id: 10,
    userId: 3, // Lory
    title: "Learning TypeScript",
    date: "2025-11-28",
    content:
      "Started learning TypeScript and it’s a game changer for catching bugs early.\n\nWould love to hear tips from anyone who’s made the switch recently!",
  },
  {
    id: 11,
    userId: 4, // Alfie
    title: "Bootcamp Reflections",
    date: "2025-11-28",
    content:
      "This bootcamp has been intense but rewarding.\n\nThanks to everyone for the support and encouragement along the way!\n\nLooking forward to seeing what everyone accomplishes next.",
  },
  {
    id: 12,
    userId: 1, // John
    title: "My First Hackathon",
    date: "2025-11-29",
    content:
      "Just wrapped up my first hackathon and it was a whirlwind of coding, coffee, and collaboration.\n\nOur team built a web app that helps track daily habits and sends reminders. The experience taught me a lot about teamwork and rapid prototyping.\n\nAlready looking forward to the next one—highly recommend giving it a try if you haven’t yet!",
  },
  {
    id: 13,
    userId: 2, // Hannah
    title: "Art Show Recap",
    date: "2025-11-29",
    content:
      "The digital art show last night was a huge success!\n\nI loved seeing everyone’s unique styles and creative approaches. The feedback from attendees was overwhelmingly positive.\n\nLet’s keep pushing boundaries and maybe plan another event soon.",
  },
  {
    id: 14,
    userId: 3, // Lory
    title: "Debugging Nightmares",
    date: "2025-11-29",
    content:
      "Spent hours chasing a bug only to realize it was a missing semicolon.\n\nIt’s always the little things that trip us up! At least I learned some new debugging tricks along the way.\n\nAnyone else have a funny debugging story? Share below!",
  },
  {
    id: 15,
    userId: 4, // Alfie
    title: "Healthy Coding Habits",
    date: "2025-11-29",
    content:
      "Taking regular breaks has made a huge difference in my productivity.\n\nI’ve started using the Pomodoro technique and it helps me stay focused.\n\nWould love to hear what habits help you stay sharp during long coding sessions.",
  },
  {
    id: 16,
    userId: 1, // John
    title: "Open Source Journey",
    date: "2025-11-29",
    content:
      "Contributed to my first open source project this week!\n\nThe community was welcoming and I learned a lot about code reviews and collaboration.\n\nIf you’re thinking about contributing, don’t hesitate—there’s a place for everyone.",
  },
  {
    id: 17,
    userId: 2, // Hannah
    title: "Creative Coding Workshop",
    date: "2025-11-29",
    content:
      "Hosted a creative coding workshop and the turnout was fantastic.\n\nWe explored generative art and interactive web experiences.\n\nThanks to everyone who participated—let’s do it again soon!",
  },
  {
    id: 18,
    userId: 3, // Lory
    title: "Favorite Dev Podcasts",
    date: "2025-11-29",
    content:
      "Recently discovered some great developer podcasts that keep me inspired.\n\nTopics range from frontend frameworks to career advice and personal growth.\n\nDrop your favorite podcast recommendations below!",
  },
  {
    id: 19,
    userId: 4, // Alfie
    title: "Code Review Reflections",
    date: "2025-11-29",
    content:
      "Had a really constructive code review session today.\n\nIt’s amazing how much you can learn from others’ perspectives and suggestions.\n\nRemember, feedback is a gift—embrace it and keep improving!",
  },
];
