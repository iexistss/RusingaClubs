export type Club = {
  id: string;
  name: string;
  description: string;
  audience: string;
  subscriptionRequired?: boolean;
  meeting_day: string;
  meeting_time: string;
  leader_name: string;
  leader_contact?: string;
  color: string;
  icon: string;
  members: number;
};

export type Student = { id: string; name: string; class_year: string; contact?: string };

const club = (id: string, name: string, audience: string, description: string, day: string, color: string, icon: string, subscriptionRequired = false): Club => ({
  id, name, audience, description, subscriptionRequired, meeting_day: day, meeting_time: "3:45 PM", leader_name: "To be assigned", color, icon, members: 0
});

export const clubs: Club[] = [
  club("archery", "Archery", "All years", "Focus, form, and calm under pressure. Subscription required.", "Monday", "orange", "⌁", true),
  club("chess-ks3-4", "Chess", "KS3 & KS4", "Build a sharper game through tactics, patience, and friendly competition.", "Tuesday", "violet", "♞"),
  club("chess-ks5", "Chess", "KS5 Sixth Form", "Advanced chess for Sixth Form students. Subscription required.", "Tuesday", "violet", "♞", true),
  club("world-scholars", "World Scholars", "All years", "Explore global issues, research deeply, and represent Rusinga with confidence.", "Wednesday", "blue", "◎"),
  club("board-games-ks3-4", "Board Games", "KS3 & KS4", "Strategy, teamwork, and a little friendly rivalry around the table.", "Thursday", "yellow", "✦"),
  club("board-games-year-12", "Board Games", "Sixth Form · Year 12", "A relaxed Year 12 space for classic games and new challenges.", "Thursday", "yellow", "✦"),
  club("board-games-year-13", "Board Games", "Sixth Form · Year 13", "A relaxed Year 13 space for classic games and new challenges.", "Thursday", "yellow", "✦"),
  club("art-design", "Art and Design", "All years", "Experiment with materials, develop your eye, and make work you are proud of.", "Monday", "violet", "✺"),
  club("debating", "Debating", "All years", "Find your voice, think on your feet, and make an argument that moves people.", "Tuesday", "violet", "↯"),
  club("photography", "Photography", "KS5 Sixth Form only", "Learn to see differently through composition, light, and visual storytelling.", "Wednesday", "orange", "◉"),
  club("emun-saimun", "EMUN / SAIMUN", "All years", "Prepare for Model United Nations and learn diplomacy through live debate.", "Wednesday", "blue", "◇"),
  club("aviation", "Aviation", "All years", "Discover the science, history, and future of flight. Subscription required.", "Friday", "orange", "⌁", true),
  club("library", "Library", "All years", "Read widely, share recommendations, and make the library your quiet corner.", "Monday", "green", "▤"),
  club("first-aid", "First Aid", "All years", "Build practical skills to stay calm, help others, and respond when it matters.", "Tuesday", "orange", "+"),
  club("soccer-ks3", "Soccer", "KS3", "Train together, compete fairly, and keep the beautiful game moving.", "Wednesday", "green", "◉"),
  club("cookery", "Cookery", "All years", "Learn kitchen confidence, explore flavours, and make something worth sharing. Subscription required.", "Thursday", "orange", "⌂", true),
  club("environment-conservation", "Environment and Conservation", "All years", "Lead practical projects that make our school and community greener.", "Friday", "green", "◌"),
  club("pottery", "Pottery", "All years", "Shape, glaze, and fire your ideas in a hands-on creative studio. Subscription required.", "Monday", "orange", "◒", true),
  club("coding-robotics-hackathon", "Coding / Robotics / Hackathon", "All years", "Build useful things with curious people and turn ideas into working projects.", "Tuesday", "blue", "</>"),
  club("soap-making", "Soap Making", "All years", "Make, test, and package creative soap projects. Subscription required.", "Wednesday", "orange", "✦", true),
  club("knitting", "Knitting (Yarn / Crocheting)", "All years", "A calm, creative space to learn yarn craft and make something useful. Subscription required.", "Thursday", "violet", "⌁", true),
  club("badminton", "Badminton", "All years", "Move fast, play fair, and build your game one rally at a time.", "Friday", "green", "◇"),
  club("table-tennis", "Table Tennis", "All years", "Quick reactions, smart placement, and plenty of matches.", "Monday", "green", "•"),
  club("skating", "Skating", "All years", "Find your balance, build confidence, and enjoy moving together.", "Tuesday", "blue", "◌"),
  club("drama", "Drama", "All years", "Create characters, tell bold stories, and find confidence on stage.", "Wednesday", "violet", "✦"),
  club("modelling", "Modelling", "All years", "Design, build, and present models that bring imagination to life.", "Thursday", "yellow", "△"),
  club("golf", "Golf", "All years", "Learn the fundamentals, practise your swing, and enjoy the course.", "Friday", "green", "◉"),
  club("community-service", "Community Service", "All years", "Turn care into action through projects that support our wider community.", "Monday", "green", "♡"),
  club("rotary", "Rotary (Interact / Bikerthon seasonal)", "All years", "Serve, lead, and take part in seasonal Interact and Bikerthon projects. Select another club too.", "Tuesday", "blue", "✦"),
  club("dance", "Dance", "All years", "Find rhythm, build confidence, and create performances together.", "Wednesday", "violet", "♪"),
  club("basketball", "Basketball", "All years", "Run plays, sharpen your skills, and compete as a team.", "Thursday", "orange", "◉"),
  club("netball", "Netball", "All years", "Develop your passing, movement, and teamwork on court.", "Friday", "blue", "◉")
];
