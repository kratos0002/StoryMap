export interface Story {
  id: string;
  title: string;
  author: string;
  country: string;
  countryCode: string;
  region: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  readingTimeMinutes: number;
  themes: string[];
  mood: string;
  previewText: string;
  fullText: string;
  culturalContext: string;
  imageUrl?: string;
}

export const stories: Story[] = [
  {
    id: "mountain-secret",
    title: "The Mountain's Secret",
    author: "Pemba Sherpa",
    country: "Nepal",
    countryCode: "NP",
    region: "Asia",
    coordinates: {
      lat: 27.9881,
      lng: 86.9250
    },
    readingTimeMinutes: 7,
    themes: ["Mythical", "Nature"],
    mood: "Mysterious",
    previewText: "A Sherpa guide encounters an ancient guardian spirit while leading climbers through a hidden valley near Everest.",
    fullText: "The old Sherpa guide, Mingma, had climbed these mountains for over forty years, but he had never taken foreigners to the hidden valley. It was a place known only to his people, a sanctuary where the mountain spirits dwelled.\n\nBut this season had been difficult. The changing climate had made traditional routes treacherous, and the foreign climbers who hired him were growing impatient. When the American expedition leader, Dr. Harrison, showed him an old map with the valley clearly marked, Mingma felt a cold unease settle in his stomach.\n\n\"This route,\" Dr. Harrison had said, tapping the faded parchment, \"will give us a competitive advantage. No one has documented this approach to the summit.\"\n\nMingma had tried to dissuade him. \"The valley is sacred to my people. It is not a path for outsiders.\"\n\nBut Dr. Harrison had merely smiled. \"We'll be respectful. Scientific progress requires exploration.\"\n\nAnd so, against his better judgment, Mingma led the five climbers into the valley as the morning mist still clung to the ancient rhododendron forests. The foreigners marveled at the untouched beauty, taking photographs and samples, oblivious to Mingma's growing discomfort.\n\nBy midday, they had reached the stone circle—seven weathered monoliths arranged in a perfect circle around a flat altar stone. Dr. Harrison was ecstatic, immediately setting up equipment to document the find.\n\n\"Please,\" Mingma warned, \"we should not linger here.\"\n\nBut the scientists were too engrossed in their discovery to heed his words. As the sun began to set, casting long shadows across the valley floor, a wind rose from nowhere, carrying with it a scent of juniper and something older—something that reminded Mingma of the high caves where his ancestors were laid to rest.\n\n\"We must leave now,\" he insisted, but his words were lost in a sudden swirl of mist that enveloped the stone circle.\n\nWhen it cleared moments later, Dr. Harrison and his team were gone. Only their equipment remained, scattered across the ground as if dropped in haste.\n\nMingma was alone—or so he thought until he saw the figure standing by the central stone. It appeared to be an old man dressed in the traditional garb of a Sherpa from generations past, but his eyes reflected the ancient glaciers.\n\n\"They did not listen,\" the figure said in a dialect so old that Mingma barely understood it.\n\n\"Where are they?\" Mingma asked, his voice barely a whisper.\n\n\"They have been shown the true paths of the mountain,\" the figure replied. \"As all who disrespect these sacred grounds must be.\"\n\n\"Will they return?\"\n\nThe ancient one considered this. \"Perhaps. When they understand that the mountain does not yield its secrets to those who seek to conquer it, but only to those who come with reverence.\"\n\nMingma nodded, understanding at last why his grandfather had warned him never to guide outsiders to this place.\n\n\"And you, Mingma, son of Dorje,\" the figure continued, \"what will you tell those who sent them?\"\n\nMingma looked down at the abandoned equipment, then back at the ancient guardian. \"I will tell them that the mountain keeps its own counsel, and that some paths are not meant to be mapped.\"\n\nThe figure nodded, and then seemed to dissolve into the mist that was once again rolling through the valley.\n\nMingma gathered what he could carry and began the long journey back alone. Behind him, the stone circle stood silent, guarding secrets that would remain hidden from the world of men for a while longer.\n\nWhen search parties came looking for the missing expedition, Mingma told them of an avalanche that had swept the scientists away. It was easier than the truth. And on each subsequent season, when climbers would ask about the hidden valley route, Mingma would shake his head and say simply, \"The mountain does not wish it.\"\n\nAnd they, seeing the certainty in his eyes, would not ask again.",
    culturalContext: "In Sherpa culture, mountains are not merely geological formations but sacred entities with their own spirits and guardians. Mount Everest, known locally as Chomolungma, is considered the 'Mother Goddess of the World.'\n\nBefore climbing expeditions, Sherpas traditionally perform puja ceremonies to ask permission from the mountain deities. These rituals involve offerings of food, incense, and prayers to ensure safe passage.\n\nThe concept of sacred valleys hidden within the Himalayas appears in many Sherpa legends. These places are often described as beyul—hidden valleys blessed by Guru Rinpoche that serve as sanctuaries during troubled times.\n\nThe story reflects the tension between traditional Sherpa spiritual beliefs and the modern Western approach to mountains as challenges to be conquered. It also touches on the ethical questions surrounding the commercialization of sacred spaces and the environmental impact of climbing tourism in the Himalayas.",
    imageUrl: "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: "river-spirits",
    title: "River Spirits",
    author: "Isabella Santos",
    country: "Brazil",
    countryCode: "BR",
    region: "South America",
    coordinates: {
      lat: -3.4653,
      lng: -62.2159
    },
    readingTimeMinutes: 5,
    themes: ["Folklore", "Nature"],
    mood: "Enchanting",
    previewText: "A young girl from a riverside community encounters the mythical Boto Encantado during the annual river festival.",
    fullText: "The river knew secrets that the people of Porto do Céu could only guess at. It carried whispers from distant mountains, stories from other villages, and—some said—messages from the spirit world. Twelve-year-old Luiza believed these tales more than most.\n\nIt was the night of the River Festival, when the waters of the Amazon rose to their highest point, and the boundary between worlds grew thin. Colorful lanterns hung from every house in the floating village, their reflections dancing on the dark water like fallen stars.\n\nLuiza's grandmother had warned her to stay close during the festivities. \"The Boto comes on nights like these,\" she had said, her eyes serious above her smile. \"Looking for pretty young girls to charm.\"\n\nThe Boto—the pink river dolphin that could transform into a handsome man. Luiza had heard the stories since she was small: how he would appear at festivals dressed all in white, wearing a hat to hide the blowhole he could never fully transform away, how he would seduce young women and disappear before dawn, returning to the river.\n\nLuiza wasn't afraid. At twelve, she was too young to be of interest to the Boto, and too old to believe in such tales without question. Still, she kept her eyes open as she navigated through the crowd, balancing carefully on the wooden walkways that connected the floating homes.\n\nThe music grew louder as she approached the central platform where the celebration was in full swing. Couples danced to the rhythm of drums and flutes, their feet stamping in time on the wooden boards. The aroma of grilled fish and sweet manioc cakes filled the air.\n\nThat's when she saw him—a young man standing at the edge of the platform, partially hidden in shadow. He was dressed in white from head to toe, and though he smiled at the dancers, he remained apart from them. Something about his stillness amid the movement caught Luiza's attention.\n\nAs if sensing her gaze, he turned. Even in the dim light, she could see his eyes were the deep gray of river water at dusk. He smiled at her, and Luiza felt a strange recognition, though she was certain she had never seen him before.\n\nWithout thinking, she moved toward him, weaving through the dancers. But before she could reach him, her cousin Miguel grabbed her arm.\n\n\"Mamãe is looking for you,\" he shouted over the music. \"Come help with the food.\"\n\nWhen Luiza looked back, the man in white was gone. Disappointed but obedient, she followed Miguel to where her aunt was serving food to the villagers.\n\nHours later, as the celebration continued under the star-filled sky, Luiza slipped away to the quiet edge of the village. The wooden platform here extended out over the dark water, and she sat with her feet dangling above the river's surface.\n\n\"You should be careful,\" came a voice beside her. \"The river can be unpredictable.\"\n\nLuiza startled. It was the man in white, now sitting beside her though she hadn't heard him approach. Up close, she could see he was younger than she had first thought—perhaps sixteen or seventeen.\n\n\"I've lived on this river my whole life,\" she replied, trying to sound braver than she felt. \"I know its moods.\"\n\nHe smiled. \"Do you? I think the river still has many secrets to share with you.\"\n\nThere was something in his voice that reminded Luiza of the current—smooth on the surface but with hidden depths. She noticed he wore a woven bracelet of river reeds around his wrist, similar to one her grandmother had made for her last birthday.\n\n\"Are you from upriver?\" she asked. \"I don't recognize you.\"\n\n\"I travel a lot,\" he said. \"But I always return to these waters. They're home.\"\n\nHe reached into his pocket and pulled out a small object that caught the moonlight. It was a perfectly formed river pearl, iridescent and glowing.\n\n\"For you,\" he said, placing it in her palm. \"A reminder that the most beautiful things often remain hidden beneath the surface.\"\n\nBefore Luiza could thank him, shouts erupted from the central platform. The year's fishing champion was being announced, and everyone was calling for the village elders to begin the blessing ceremony.\n\n\"You should join your family,\" the young man said. \"It's important to honor traditions.\"\n\nLuiza nodded and stood up. \"Will you come?\"\n\nHe shook his head. \"I prefer to watch from a distance. But I'll see you again, Luiza. The river connects us all.\"\n\nIt wasn't until she was halfway back to the celebration that Luiza realized she had never told him her name.\n\nThe next morning, Luiza woke early and went straight to the water's edge. The pearl sat on her bedside table, confirmation that the strange encounter hadn't been a dream. As she looked out over the misty river, a flash of pink broke the surface—a river dolphin, arcing gracefully before disappearing back into the depths.\n\nLuiza smiled and whispered, \"Until we meet again.\"\n\nIn her hand, the pearl seemed to pulse with a light of its own, like a tiny captured star. Or perhaps, she thought, like a promise from the river itself.",
    culturalContext: "The Boto Encantado (Enchanted Dolphin) is one of the most famous legends of the Amazon River Basin. According to folklore, the pink river dolphin (Boto) can transform into a handsome young man who seduces young women at village festivals and celebrations.\n\nIn traditional stories, the Boto always wears a hat to conceal the blowhole on top of his head, which he cannot fully transform. He is said to be an enchanting dancer and impossible to resist when he sets his sights on someone.\n\nThe floating villages of the Amazon are real communities where houses, schools, and shops are built on floating platforms that rise and fall with the river's seasonal floods. These communities have developed a unique relationship with the river, which serves as their road, food source, and the center of their cultural identity.\n\nThe River Festival described in the story is similar to real celebrations like the Festival of Boto, where the pink dolphin is celebrated as a symbol of the Amazon's magic and mystery. These festivals often coincide with the flood season, when the river is at its highest point.",
    imageUrl: "https://images.unsplash.com/photo-1598880513756-c8913260e471?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: "city-of-dreams",
    title: "City of Dreams",
    author: "Kenji Tanaka",
    country: "Japan",
    countryCode: "JP",
    region: "Asia",
    coordinates: {
      lat: 35.6762,
      lng: 139.6503
    },
    readingTimeMinutes: 8,
    themes: ["Urban", "Mythical"],
    mood: "Surreal",
    previewText: "A Tokyo businessman follows a mysterious blue door into a hidden version of the city that exists between midnight and dawn.",
    fullText: "Kenji Matsuda had worked at the same securities firm in Shinjuku for fifteen years. Each day was identical to the last: the same crowded morning train, the same convenience store coffee, the same reports to file before the markets opened in New York. He had stopped noticing the city around him years ago.\n\nIt was nearly midnight when he finally left the office tower. A light rain had begun to fall, blurring the neon signs and turning the streets into mirrors. Kenji had missed the last express train and would have to take the local line, adding another forty minutes to his commute. He sighed and opened his umbrella.\n\nHe decided to cut through the narrow alleyways behind the main boulevard—a route he rarely took. The rain muffled the sounds of the city, creating an unusual pocket of silence. That's when he noticed the door.\n\nIt was painted a deep blue that seemed to glow against the gray concrete wall. Kenji was certain it hadn't been there before—he would have remembered such an unusual color in this monochrome part of the city. There was no sign, no indication of what might lie beyond it.\n\nPerhaps it was the lateness of the hour, or perhaps it was the strange quality of the rain-soaked night, but something compelled Kenji to approach the door. When he touched the handle, it was warm despite the cool air.\n\nHe opened it.\n\nInstead of a room or a hallway, Kenji found himself stepping onto a street that was both familiar and utterly changed. It was still Tokyo—he could see the distant silhouette of Tokyo Tower—but the crowded buildings had been transformed. Plants and vines cascaded from every balcony and rooftop. The street itself was free of cars, replaced by channels of clear flowing water. Bridges arched gracefully between buildings, and paper lanterns floated in the air without any visible means of support.\n\nKenji turned back, but the blue door had vanished. Where it had stood was now a solid wall covered in a mural of swimming koi.\n\n\"First time crossing over?\"\n\nKenji spun around to find an elderly man in a traditional indigo jacket watching him with amusement.\n\n\"I... where am I?\" Kenji asked.\n\n\"Tokyo,\" the old man replied simply. \"Just... a different layer of it. The city dreams at night, you see, and sometimes those dreams take form.\"\n\n\"I don't understand,\" Kenji said.\n\n\"No one does at first,\" the old man said, gesturing to the cushion across from him.\n\nKenji sat, and the man poured him a cup of tea that steamed with impossible colors.\n\n\"Tokyo has many faces,\" the old man explained. \"The one you know is just the most recent mask it wears. But underneath, there are older versions that still exist in the spaces between moments. This Tokyo remembers the canals that once flowed through Edo. It remembers the gardens that stood where skyscrapers now reach for the clouds.\"\n\n\"But how is this possible?\" Kenji asked.\n\nThe old man smiled. \"The city is more than concrete and steel. It's made of stories and memories and dreams. Those who have forgotten how to see can sometimes stumble into these hidden layers—especially between midnight and dawn, when the boundaries grow thin.\"\n\nKenji looked around at the transformed city. In the distance, he could see a traditional wooden pagoda rising where the Metropolitan Government Building should stand. Cherry blossoms bloomed despite the season, their petals drifting down to float on the canal waters.\n\n\"Can I... explore?\" Kenji asked hesitantly.\n\n\"Of course,\" the old man said. \"That's why you're here. But remember, you must return before dawn. The doorways close when the first train runs.\"\n\nKenji spent hours wandering through the dream Tokyo. He crossed bridges where salarymen like himself would normally be hurrying to work. He passed tea houses filled with patrons in kimonos who nodded to him as if he were a regular customer. Street vendors offered him foods he remembered from his grandmother's kitchen—tastes that had been lost to time and convenience.\n\nIn a small park that should have been a parking structure, Kenji found a group of children playing with tops and paper balloons. They invited him to join their game, and for the first time in years, he felt the simple joy of play.\n\nAs the night deepened, Kenji found himself in a garden overlooking the city. Fireflies danced among the carefully pruned trees, and the moon seemed impossibly large in the sky.\n\n\"It's beautiful here,\" he said to no one in particular.\n\n\"It's your Tokyo too,\" came a voice. A woman in a summer yukata stood nearby, her face half-hidden by a folding fan. \"It's always been here, waiting for you to remember it.\"\n\n\"I never knew,\" Kenji said.\n\n\"Few do anymore,\" she replied. \"They move through the city with their eyes on screens, never looking up to see the magic that surrounds them. They've forgotten that cities are living things with many layers of history and meaning.\"\n\nShe pointed to the horizon, where the sky was beginning to lighten almost imperceptibly.\n\n\"Dawn approaches,\" she said. \"You should find your way back.\"\n\n\"How?\" Kenji asked, suddenly anxious. \"The door disappeared.\"\n\nShe smiled. \"Doors appear for those who need them. Look for the color that feels like home.\"\n\nKenji made his way back through the dream city as the stars began to fade. The streets were emptying, the lanterns dimming. He felt a growing urgency with each step.\n\nThen he saw it—a red door set into a stone wall. The color reminded him of the lacquered box where his mother had kept her most precious photographs. Without hesitation, he turned the handle and stepped through.\n\nHe emerged into the familiar alleyway, now bathed in the gray light of early morning. The rain had stopped, and the city was stirring to life. Checking his watch, Kenji was startled to see it was 5:30 AM—the exact time the first train would be departing.\n\nHe made his way to the station, his mind filled with images of the dream Tokyo. As he waited on the platform, he noticed details he had overlooked for years—the pattern of tiles on the floor, the calligraphy on a shop sign, the way the light filtered through the station's glass ceiling.\n\nWhen Kenji arrived at work that morning, his colleagues commented on his changed appearance.\n\n\"Did something good happen?\" his assistant asked. \"You seem... different.\"\n\nKenji smiled. \"I just saw the city with new eyes.\"\n\nThat night, and many nights after, Kenji would leave work early enough to walk home, taking different routes through the city, observing the details and textures of Tokyo's many layers. He never found the blue door again, but sometimes, in the quiet moments between midnight and dawn, he would catch glimpses of paper lanterns floating above the traffic, or hear the distant sound of shamisen music drifting from an alleyway.\n\nAnd on his desk at home, he kept a small jar of water from the dream city's canal—water that never evaporated and sometimes, when the light hit it just right, seemed to contain an entire world within its depths.",
    culturalContext: "This story draws on several elements of Japanese urban folklore and cultural concepts. The idea of hidden layers or dimensions within familiar spaces is common in Japanese folklore, where the boundary between the mundane world and supernatural realms is often portrayed as permeable.\n\nThe story references Edo, the former name of Tokyo before it became Japan's capital in 1868. Edo was known for its extensive canal system and garden landscapes, much of which was transformed during Tokyo's rapid modernization.\n\nThe concept of ma (間) – the meaningful space or interval between things – is subtly present in the story. In Japanese aesthetics, ma refers not just to physical space but to the pause or emptiness that gives form to the whole. The \"dream Tokyo\" exists in the ma between midnight and dawn.\n\nThe story also touches on the Japanese concept of honne and tatemae – the contrast between one's true feelings (honne) and the face one presents to the world (tatemae). Kenji's discovery of dream Tokyo represents his reconnection with his authentic self beneath the salaryman exterior.\n\nThe elderly man in the indigo jacket represents the wisdom of tradition, while the floating lanterns and impossible tea are elements of the fantastical that often appear in Japanese folklore when boundaries between worlds thin.",
    imageUrl: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
  },
  // Adding new stories from the JSON collection
  {
    id: "tell-tale-heart",
    title: "The Tell-Tale Heart",
    author: "Edgar Allan Poe",
    country: "United States",
    countryCode: "US",
    region: "North America",
    coordinates: {
      lat: 39.9526,
      lng: -75.1652
    },
    readingTimeMinutes: 20,
    themes: ["Guilt", "Madness", "Paranoia", "Murder", "Psychological deterioration"],
    mood: "Suspenseful, disturbing, claustrophobic",
    previewText: "An unnamed narrator attempts to convince the reader of his sanity while describing a murder he committed against an old man with a \"vulture eye.\"",
    fullText: "For the full text, please visit: https://www.gutenberg.org/files/2148/2148-h/2148-h.htm#link2H_4_0010",
    culturalContext: "Written during a time of growing interest in psychology and the human mind. Poe pioneered psychological horror and explored the darker aspects of human consciousness.",
    imageUrl: "https://images.unsplash.com/photo-1509557965875-b88c97052f43?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  },
  {
    id: "gift-of-the-magi",
    title: "The Gift of the Magi",
    author: "O. Henry",
    country: "United States",
    countryCode: "US",
    region: "North America",
    coordinates: {
      lat: 40.7128,
      lng: -74.0060
    },
    readingTimeMinutes: 15,
    themes: ["Love", "Sacrifice", "Irony", "Poverty", "Gift-giving"],
    mood: "Sentimental, bittersweet, warm",
    previewText: "A young married couple, Jim and Della, sacrifice their most prized possessions to buy Christmas gifts for each other.",
    fullText: "For the full text, please visit: https://www.gutenberg.org/files/7256/7256-h/7256-h.htm",
    culturalContext: "Written during the Gilded Age when economic inequality was stark. The story celebrates the value of emotional wealth over material possessions.",
    imageUrl: "https://images.unsplash.com/photo-1512909006721-3d6018887383?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  },
  {
    id: "legend-of-sleepy-hollow",
    title: "The Legend of Sleepy Hollow",
    author: "Washington Irving",
    country: "United States",
    countryCode: "US",
    region: "North America",
    coordinates: {
      lat: 41.0854,
      lng: -73.8621
    },
    readingTimeMinutes: 45,
    themes: ["Superstition", "Rural American life", "Outsiders", "Folklore", "Ambition"],
    mood: "Eerie, humorous, atmospheric",
    previewText: "Ichabod Crane, a superstitious schoolmaster, competes with the local hero Brom Bones for the hand of Katrina Van Tassel, only to encounter the legendary Headless Horseman.",
    fullText: "For the full text, please visit: https://www.gutenberg.org/files/41/41-h/41-h.htm#page_272",
    culturalContext: "Written when America was establishing its cultural identity separate from Europe. Irving incorporated Dutch-American folklore to create distinctly American literature.",
    imageUrl: "https://images.unsplash.com/photo-1508165821229-7be2a6934be5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  },
  {
    id: "rip-van-winkle",
    title: "Rip Van Winkle",
    author: "Washington Irving",
    country: "United States",
    countryCode: "US",
    region: "North America",
    coordinates: {
      lat: 42.1792,
      lng: -74.0235
    },
    readingTimeMinutes: 30,
    themes: ["Change", "American identity", "Passage of time", "Escape from responsibility"],
    mood: "Whimsical, nostalgic, satirical",
    previewText: "Rip Van Winkle wanders into the Catskill Mountains, meets strange men, drinks their liquor, and falls asleep for 20 years, awakening to find America transformed.",
    fullText: "For the full text, please visit: https://www.gutenberg.org/files/41/41-h/41-h.htm#page_28",
    culturalContext: "Written during a period when America was rapidly changing and establishing its national identity. The story explores the tension between colonial past and republican future.",
    imageUrl: "https://images.unsplash.com/photo-1516939884455-1445c8652f83?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  },
  {
    id: "yellow-wallpaper",
    title: "The Yellow Wallpaper",
    author: "Charlotte Perkins Gilman",
    country: "United States",
    countryCode: "US",
    region: "North America",
    coordinates: {
      lat: 42.3601,
      lng: -71.0589
    },
    readingTimeMinutes: 30,
    themes: ["Mental health", "Women's rights", "Confinement", "Patriarchy", "Medical misunderstanding"],
    mood: "Claustrophobic, disturbing, increasingly frantic",
    previewText: "A woman suffering from depression is prescribed a \"rest cure\" by her physician husband, leading to her mental deterioration as she becomes obsessed with the yellow wallpaper in her room.",
    fullText: "For the full text, please visit: https://www.gutenberg.org/files/1952/1952-h/1952-h.htm",
    culturalContext: "Written as a critique of the \"rest cure\" prescribed to women with \"nervous disorders.\" Gilman herself was prescribed this treatment and wrote the story to highlight its harmful effects.",
    imageUrl: "https://images.unsplash.com/photo-1585314062604-1a357de8b000?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80"
  },
  {
    id: "the-birthmark",
    title: "The Birthmark",
    author: "Nathaniel Hawthorne",
    country: "United States",
    countryCode: "US",
    region: "North America",
    coordinates: {
      lat: 42.5195,
      lng: -70.8967
    },
    readingTimeMinutes: 35,
    themes: ["Perfection", "Science vs. nature", "Hubris", "Beauty", "Mortality"],
    mood: "Ominous, philosophical, tragic",
    previewText: "A scientist becomes obsessed with removing a small hand-shaped birthmark from his wife's cheek, with tragic consequences.",
    fullText: "For the full text, please visit: https://www.gutenberg.org/files/512/512-h/512-h.htm#birthmark",
    culturalContext: "Written during a time of rapid scientific advancement and growing faith in human ability to control nature. Hawthorne questions this hubris and explores the dangers of pursuing perfection.",
    imageUrl: "https://images.unsplash.com/photo-1584278860047-22db9ff82bed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  },
  {
    id: "to-build-a-fire",
    title: "To Build a Fire",
    author: "Jack London",
    country: "Canada",
    countryCode: "CA",
    region: "North America",
    coordinates: {
      lat: 64.0582,
      lng: -139.4290
    },
    readingTimeMinutes: 40,
    themes: ["Man vs. nature", "Survival", "Hubris", "Instinct vs. intellect"],
    mood: "Harsh, tense, increasingly desperate",
    previewText: "An unnamed man travels through the freezing Yukon Territory, ignoring warnings and struggling to build a life-saving fire as temperatures plummet.",
    fullText: "For the full text, please visit: https://www.gutenberg.org/files/910/910-h/910-h.htm#to-build-a-fire",
    culturalContext: "Written during a time of frontier exploration and the myth of man's dominion over nature. London, who had firsthand experience in the Klondike, portrays nature as indifferent to human concerns.",
    imageUrl: "https://images.unsplash.com/photo-1483982258113-b72862e6cff6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  },
  {
    id: "most-dangerous-game",
    title: "The Most Dangerous Game",
    author: "Richard Connell",
    country: "Caribbean",
    countryCode: "XX",
    region: "Caribbean",
    coordinates: {
      lat: 18.2208,
      lng: -66.5901
    },
    readingTimeMinutes: 45,
    themes: ["Hunter vs. hunted", "Civilization vs. savagery", "Survival", "Morality of killing"],
    mood: "Suspenseful, adventurous, menacing",
    previewText: "After falling off a yacht, renowned hunter Sanger Rainsford swims to a nearby island where he meets General Zaroff, a Russian aristocrat who hunts humans for sport.",
    fullText: "For the full text, please visit: https://www.gutenberg.org/cache/epub/1872/pg1872-images.html",
    culturalContext: "Written in the aftermath of World War I, which raised questions about human savagery and the thin veneer of civilization. Also reflects colonial-era attitudes about \"civilized\" vs. \"primitive\" behavior.",
    imageUrl: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1141&q=80"
  },
  {
    id: "monkeys-paw",
    title: "The Monkey's Paw",
    author: "W.W. Jacobs",
    country: "England",
    countryCode: "GB",
    region: "Europe",
    coordinates: {
      lat: 51.5074,
      lng: -0.1278
    },
    readingTimeMinutes: 25,
    themes: ["Fate", "Greed", "Grief", "Unintended consequences", "Supernatural"],
    mood: "Eerie, suspenseful, tragic",
    previewText: "A family receives a mummified monkey's paw that grants three wishes with terrible consequences.",
    fullText: "For the full text, please visit: https://www.gutenberg.org/files/12122/12122-h/12122-h.htm#THE_MONKEY%27S_PAW",
    culturalContext: "Written during a time of British colonial expansion and fascination with \"exotic\" artifacts from other cultures. Also reflects Victorian/Edwardian interest in the supernatural and cautionary tales.",
    imageUrl: "https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80"
  },
  {
    id: "mr-elvesham",
    title: "The Story of the Late Mr. Elvesham",
    author: "H.G. Wells",
    country: "England",
    countryCode: "GB",
    region: "Europe",
    coordinates: {
      lat: 51.5074,
      lng: -0.1278
    },
    readingTimeMinutes: 30,
    themes: ["Identity", "Aging", "Scientific ethics", "Body swapping"],
    mood: "Unsettling, paranoid, desperate",
    previewText: "A young medical student is befriended by an elderly philosopher who switches bodies with him through a drugged drink.",
    fullText: "For the full text, please visit: https://www.gutenberg.org/files/11870/11870-h/11870-h.htm#story",
    culturalContext: "Written during a period of rapid scientific advancement and growing concerns about the ethical implications of new technologies. Wells explores the dark potential of scientific progress.",
    imageUrl: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  },
  {
    id: "open-window",
    title: "The Open Window",
    author: "Saki (H.H. Munro)",
    country: "England",
    countryCode: "GB",
    region: "Europe",
    coordinates: {
      lat: 52.5310,
      lng: -1.2969
    },
    readingTimeMinutes: 15,
    themes: ["Deception", "Imagination", "Social conventions", "Nervousness"],
    mood: "Humorous, ironic, mischievous",
    previewText: "A nervous man visiting the countryside is told a tragic ghost story by a young girl with a talent for mischief.",
    fullText: "For the full text, please visit: https://www.gutenberg.org/files/269/269-h/269-h.htm#link2H_4_0001",
    culturalContext: "Written during the twilight of Edwardian England, the story satirizes upper-class country house culture and social conventions.",
    imageUrl: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  },
  {
    id: "signal-man",
    title: "The Signal-Man",
    author: "Charles Dickens",
    country: "England",
    countryCode: "GB",
    region: "Europe",
    coordinates: {
      lat: 51.3758,
      lng: -1.3631
    },
    readingTimeMinutes: 35,
    themes: ["Supernatural warnings", "Fate", "Industrialization", "Isolation"],
    mood: "Gloomy, foreboding, mysterious",
    previewText: "A signal-man working at an isolated railway cutting tells the narrator about ghostly apparitions that have appeared before tragic accidents on the line.",
    fullText: "For the full text, please visit: https://www.gutenberg.org/files/1289/1289-h/1289-h.htm#link2H_4_0003",
    culturalContext: "Written during the rapid expansion of railways in Britain, which brought both progress and new dangers. Dickens himself had survived a serious train accident in 1865, which may have influenced this story.",
    imageUrl: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1184&q=80"
  },
  {
    id: "lady-with-dog",
    title: "The Lady with the Dog",
    author: "Anton Chekhov",
    country: "Russia",
    countryCode: "RU",
    region: "Eastern Europe",
    coordinates: {
      lat: 44.4958,
      lng: 34.1663
    },
    readingTimeMinutes: 40,
    themes: ["Love", "Infidelity", "Societal constraints", "Longing", "Disillusionment"],
    mood: "Melancholic, reflective, tender",
    previewText: "Dmitri Gurov, an unhappily married Moscow banker, begins an affair with Anna Sergeyevna, a young married woman, while both are vacationing in Yalta.",
    fullText: "For the full text, please visit: https://www.gutenberg.org/files/13415/13415-h/13415-h.htm#THE_LADY_WITH_THE_DOG",
    culturalContext: "Written during a period of social transition in Russia, the story explores the constraints of conventional marriage and the search for authentic connection in a society bound by rigid expectations.",
    imageUrl: "https://images.unsplash.com/photo-1551524559-8af4e6624178?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1025&q=80"
  },
  {
    id: "the-nose",
    title: "The Nose",
    author: "Nikolai Gogol",
    country: "Russia",
    countryCode: "RU",
    region: "Eastern Europe",
    coordinates: {
      lat: 59.9343,
      lng: 30.3351
    },
    readingTimeMinutes: 45,
    themes: ["Identity", "Absurdity", "Social status", "Bureaucracy"],
    mood: "Absurd, satirical, surreal",
    previewText: "Collegiate Assessor Kovalyov wakes up one morning to discover his nose has disappeared from his face and is now living an independent life as a higher-ranking official.",
    fullText: "For the full text, please visit: https://www.gutenberg.org/files/36238/36238-h/36238-h.htm#THE_NOSE",
    culturalContext: "Written as a satire of Russian bureaucracy and social climbing during the reign of Nicholas I, when rank and status were obsessively important.",
    imageUrl: "https://images.unsplash.com/photo-1580893246395-52aead8960dc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
  },
  {
    id: "queen-of-spades",
    title: "The Queen of Spades",
    author: "Alexander Pushkin",
    country: "Russia",
    countryCode: "RU",
    region: "Eastern Europe",
    coordinates: {
      lat: 59.9343,
      lng: 30.3351
    },
    readingTimeMinutes: 50,
    themes: ["Gambling", "Greed", "Supernatural", "Obsession", "Fate"],
    mood: "Mysterious, tense, fatalistic",
    previewText: "Hermann, a young Russian officer, becomes obsessed with learning a secret card-playing formula from an elderly countess, with supernatural consequences.",
    fullText: "For the full text, please visit: https://www.gutenberg.org/files/55024/55024-h/55024-h.htm#THE_QUEEN_OF_SPADES",
    culturalContext: "Written during a time when gambling was a popular pastime among Russian aristocracy and military officers. The story explores themes of risk, chance, and the human desire to control fate.",
    imageUrl: "https://images.unsplash.com/photo-1541278107931-e006523892df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80"
  },
  {
    id: "the-overcoat",
    title: "The Overcoat",
    author: "Nikolai Gogol",
    country: "Russia",
    countryCode: "RU",
    region: "Eastern Europe",
    coordinates: {
      lat: 59.9343,
      lng: 30.3351
    },
    readingTimeMinutes: 55,
    themes: ["Poverty", "Bureaucracy", "Dignity", "Materialism", "Ghostly revenge"],
    mood: "Tragicomic, pathetic, supernatural",
    previewText: "Akaky Akakievich, a poor copying clerk, saves for months to buy a new overcoat that transforms his life, only to have it stolen, leading to his death and ghostly return.",
    fullText: "For the full text, please visit: https://www.gutenberg.org/files/36238/36238-h/36238-h.htm#THE_CLOAK",
    culturalContext: "Written as a critique of the dehumanizing Russian bureaucracy and class system, where a person's worth was determined by their rank and appearance.",
    imageUrl: "https://images.unsplash.com/photo-1551031761-29fc9b91a596?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  },
  {
    id: "the-necklace",
    title: "The Necklace",
    author: "Guy de Maupassant",
    country: "France",
    countryCode: "FR",
    region: "Western Europe",
    coordinates: {
      lat: 48.8566,
      lng: 2.3522
    },
    readingTimeMinutes: 25,
    themes: ["Pride", "Deception", "Class", "Materialism", "Irony"],
    mood: "Tragic, ironic, cautionary",
    previewText: "Mathilde Loisel borrows a diamond necklace for a high-society event, loses it, and spends ten years in poverty to replace it, only to discover the original was a fake.",
    fullText: "For the full text, please visit: https://www.gutenberg.org/files/3090/3090-h/3090-h.htm#link2H_4_0013",
    culturalContext: "Written during the Belle Époque period in France, when class distinctions were rigid and social climbing was a common aspiration.",
    imageUrl: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  },
  {
    id: "ball-of-fat",
    title: "Ball of Fat",
    author: "Guy de Maupassant",
    country: "France",
    countryCode: "FR",
    region: "Western Europe",
    coordinates: {
      lat: 49.4431,
      lng: 1.0993
    },
    readingTimeMinutes: 60,
    themes: ["Hypocrisy", "Sacrifice", "Class prejudice", "Patriotism", "Moral corruption"],
    mood: "Bitter, satirical, indignant",
    previewText: "During the Franco-Prussian War, a group of French citizens pressure a prostitute to sleep with a Prussian officer for their benefit, then treat her with contempt after her sacrifice.",
    fullText: "For the full text, please visit: https://www.gutenberg.org/files/3090/3090-h/3090-h.htm#link2H_4_0001",
    culturalContext: "Written in the aftermath of France's humiliating defeat in the Franco-Prussian War, the story critiques French society's moral bankruptcy and hypocrisy.",
    imageUrl: "https://images.unsplash.com/photo-1504197832061-98356e3dcdcd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  },
  {
    id: "last-lesson",
    title: "The Last Lesson",
    author: "Alphonse Daudet",
    country: "France",
    countryCode: "FR",
    region: "Western Europe",
    coordinates: {
      lat: 48.3158,
      lng: 7.4412
    },
    readingTimeMinutes: 20,
    themes: ["Patriotism", "Language", "Identity", "Loss", "Education"],
    mood: "Poignant, nostalgic, mournful",
    previewText: "Young Franz discovers it is the last day French will be taught in his Alsatian village after the region's annexation by Prussia following the Franco-Prussian War.",
    fullText: "For the full text, please visit: https://www.gutenberg.org/files/31253/31253-h/31253-h.htm#THE_LAST_LESSON",
    culturalContext: "Written shortly after France's loss of Alsace-Lorraine to Germany, the story reflects the trauma of this territorial and cultural loss to the French national identity.",
    imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1122&q=80"
  },
  {
    id: "hunger-artist",
    title: "A Hunger Artist",
    author: "Franz Kafka",
    country: "Austria-Hungary",
    countryCode: "AT",
    region: "Central Europe",
    coordinates: {
      lat: 50.0755,
      lng: 14.4378
    },
    readingTimeMinutes: 30,
    themes: ["Art", "Isolation", "Misunderstanding", "Dedication", "Obsolescence"],
    mood: "Melancholic, absurd, alienated",
    previewText: "A professional faster performs the art of starvation for public entertainment, but as interest in fasting wanes, he is relegated to a neglected cage in a circus.",
    fullText: "For the full text, please visit: https://www.kafka-online.info/a-hunger-artist.html",
    culturalContext: "Written as traditional entertainment forms were being replaced by new media and as artistic movements were rapidly evolving. Reflects anxieties about the artist's place in modern society.",
    imageUrl: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
  },
  {
    id: "metamorphosis",
    title: "The Metamorphosis",
    author: "Franz Kafka",
    country: "Austria-Hungary",
    countryCode: "AT",
    region: "Central Europe",
    coordinates: {
      lat: 50.0755,
      lng: 14.4378
    },
    readingTimeMinutes: 90,
    themes: ["Alienation", "Identity", "Family", "Work", "Dehumanization"],
    mood: "Absurd, disturbing, tragic",
    previewText: "Gregor Samsa wakes one morning to find himself transformed into a giant insect, leading to his family's horror, neglect, and eventual relief after his death.",
    fullText: "For the full text, please visit: https://www.gutenberg.org/files/5200/5200-h/5200-h.htm",
    culturalContext: "Written on the eve of World War I, during a period of rapid industrialization and social change that was transforming traditional family structures and work relationships.",
    imageUrl: "https://images.unsplash.com/photo-1634401802733-9b474eda0b92?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  },
  {
    id: "in-a-grove",
    title: "In a Grove",
    author: "Ryūnosuke Akutagawa",
    country: "Japan",
    countryCode: "JP",
    region: "East Asia",
    coordinates: {
      lat: 35.0116,
      lng: 135.7681
    },
    readingTimeMinutes: 25,
    themes: ["Truth", "Perspective", "Human nature", "Deception", "Honor"],
    mood: "Mysterious, contradictory, unsettling",
    previewText: "Multiple, contradictory accounts of a samurai's murder are presented, revealing the self-serving nature of each narrator and leaving the truth ambiguous.",
    fullText: "For the full text, please visit: https://www.gutenberg.org/files/69606/69606-h/69606-h.htm",
    culturalContext: "Written during Japan's rapid modernization in the early 20th century, the story questions objective truth and traditional values during a time of cultural transformation.",
    imageUrl: "https://images.unsplash.com/photo-1528164344705-47542687000d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80"
  },
  {
    id: "rashomon",
    title: "Rashomon",
    author: "Ryūnosuke Akutagawa",
    country: "Japan",
    countryCode: "JP",
    region: "East Asia",
    coordinates: {
      lat: 34.9937,
      lng: 135.7480
    },
    readingTimeMinutes: 20,
    themes: ["Moral ambiguity", "Survival", "Human nature", "Social breakdown"],
    mood: "Dark, desperate, morally ambiguous",
    previewText: "During a time of famine in Kyoto, an unemployed servant takes shelter in the dilapidated Rashomon gate and encounters an old woman stealing hair from corpses.",
    fullText: "For the full text, please visit: https://www.gutenberg.org/files/69606/69606-h/69606-h.htm",
    culturalContext: "Written as Japan was transitioning from a feudal society to a modern nation, the story explores the breakdown of moral codes during times of crisis.",
    imageUrl: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  },
  {
    id: "true-story-of-ah-q",
    title: "The True Story of Ah Q",
    author: "Lu Xun",
    country: "China",
    countryCode: "CN",
    region: "East Asia",
    coordinates: {
      lat: 31.2304,
      lng: 120.5859
    },
    readingTimeMinutes: 70,
    themes: ["National character", "Self-deception", "Revolution", "Social change"],
    mood: "Satirical, tragic, critical",
    previewText: "Ah Q, an uneducated peasant known for his \"spiritual victories\" of self-deception, witnesses but fails to understand the 1911 Revolution before being executed for a crime he didn't commit.",
    fullText: "For the full text, please visit: https://www.marxists.org/archive/lu-xun/1921/12/ah-q/index.htm",
    culturalContext: "Written during China's tumultuous transition from imperial rule to republic, the story critiques the Chinese national character and the failure of the 1911 Revolution to bring meaningful change to ordinary people.",
    imageUrl: "https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  },
  {
    id: "arabian-nights-selected",
    title: "The Arabian Nights (Selected Tales)",
    author: "Various (compiled over centuries)",
    country: "Middle East",
    countryCode: "IQ",
    region: "Middle East",
    coordinates: {
      lat: 33.3152,
      lng: 44.3661
    },
    readingTimeMinutes: 40,
    themes: ["Storytelling", "Fate", "Cleverness", "Justice", "Supernatural"],
    mood: "Magical, adventurous, suspenseful",
    previewText: "Scheherazade tells King Shahryar a new story each night to postpone her execution, weaving tales of adventure, romance, tragedy, comedy, and the supernatural.",
    fullText: "For the full text, please visit: https://www.gutenberg.org/files/51252/51252-h/51252-h.htm",
    culturalContext: "Compiled during the Islamic Golden Age, these tales reflect the cosmopolitan nature of the medieval Islamic world, incorporating elements from Persian, Arabic, Indian, Egyptian, and Mesopotamian cultures.",
    imageUrl: "https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
  },
  {
    id: "sun-moon-sky",
    title: "Why the Sun and the Moon Live in the Sky",
    author: "Traditional (Nigerian folklore)",
    country: "Nigeria",
    countryCode: "NG",
    region: "Africa",
    coordinates: {
      lat: 9.0820,
      lng: 8.6753
    },
    readingTimeMinutes: 10,
    themes: ["Hospitality", "Natural elements", "Consequences", "Relationships"],
    mood: "Whimsical, explanatory, cautionary",
    previewText: "The Sun and his wife, the Moon, invite their friend Water to visit their home, but are forced to retreat to the sky when Water and his relatives fill their house.",
    fullText: "For the full text, please visit: https://www.gutenberg.org/files/39308/39308-h/39308-h.htm",
    culturalContext: "Part of the rich tradition of African explanatory tales that use anthropomorphism to explain natural phenomena and teach social values.",
    imageUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1194&q=80"
  }
];
