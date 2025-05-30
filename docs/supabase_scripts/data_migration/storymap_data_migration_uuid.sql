-- StoryMap Data Migration
-- Generated on 2025-05-30 07:11:09
-- Uses UUIDs for all primary keys including story IDs

-- Insert authors
INSERT INTO authors (id, name, birth_year, death_year, nationality, bio) VALUES
('5b92ac1b-8bad-417f-8625-56a80752b9af', 'Pemba Sherpa', NULL, NULL, NULL, NULL),
('f80bf5a9-149f-4d87-ad8c-e690ee208ce2', 'Isabella Santos', NULL, NULL, NULL, NULL),
('90744b70-a16a-4379-a91c-b1517c32e938', 'Kenji Tanaka', NULL, NULL, NULL, NULL),
('3e0e8c92-e9ec-4270-806a-2667d6b5c3ac', 'Edgar Allan Poe', NULL, NULL, NULL, NULL),
('dd1838ec-e3bf-40be-a5a6-5cc56668348c', 'O. Henry', NULL, NULL, NULL, NULL),
('f22c5b5f-3d00-4122-b980-2d7474d8016c', 'Washington Irving', NULL, NULL, NULL, NULL),
('c2bbdae5-2b88-4cdb-aebb-0ec44b34a299', 'Charlotte Perkins Gilman', NULL, NULL, NULL, NULL),
('90bbbfad-36b2-4f04-89ad-d4a346efcc2c', 'Nathaniel Hawthorne', NULL, NULL, NULL, NULL),
('b6e40083-2e37-4f32-8818-bcedc8cc462e', 'Jack London', NULL, NULL, NULL, NULL),
('af3eec2e-c0e1-4db3-a330-aad3a532d6e3', 'Richard Connell', NULL, NULL, NULL, NULL),
('7760dd02-bd40-4afb-a859-3ee92da2ba98', 'W.W. Jacobs', NULL, NULL, NULL, NULL),
('4457a582-380c-4dcc-9fdd-f30a1e146ccf', 'H.G. Wells', NULL, NULL, NULL, NULL),
('cdc1980e-4a9b-436d-b5d4-72c7424866d6', 'Saki (H.H. Munro)', NULL, NULL, NULL, NULL),
('45ba7c3a-107a-4bc1-8a8b-f489c561fe48', 'Charles Dickens', NULL, NULL, NULL, NULL),
('79d079a2-5bef-400f-8836-45d77dce8fd5', 'Anton Chekhov', NULL, NULL, NULL, NULL),
('e5e07593-be81-4a34-9ce9-92ef55a3d4d5', 'Nikolai Gogol', NULL, NULL, NULL, NULL),
('1af93f6c-cc01-4c83-874c-5ae556a99877', 'Alexander Pushkin', NULL, NULL, NULL, NULL),
('ede20284-ed16-476c-b416-bc4e3f975edb', 'Guy de Maupassant', NULL, NULL, NULL, NULL),
('6c02bdd5-14fd-4509-96ab-bf36f54079cb', 'Alphonse Daudet', NULL, NULL, NULL, NULL),
('2fb3a9d4-a8c4-4620-9105-736d260e40ca', 'Franz Kafka', NULL, NULL, NULL, NULL),
('7778e0ac-70e6-4248-95fc-d16d41b291bb', 'Ryūnosuke Akutagawa', NULL, NULL, NULL, NULL),
('9ad0a3d7-f93b-4f8b-aae8-abf25b2b3704', 'Lu Xun', NULL, NULL, NULL, NULL),
('6ae50507-7eb4-417f-842c-fa5fcbeb5b67', 'Various (compiled over centuries)', NULL, NULL, NULL, NULL),
('71a84704-fa31-471e-b6d2-fb568936ba25', 'Traditional (Nigerian folklore)', NULL, NULL, NULL, NULL);

-- Insert locations
INSERT INTO locations (id, name, latitude, longitude, location_type, country_code, region, description) VALUES
('eb0c0d01-5bef-47e7-83a4-a11e8403444b', 'Nepal', 27.9881, 86.925, 'real', 'NP', 'Asia', NULL),
('04515265-ffcd-4a8d-a20e-e1498d54a1bf', 'Brazil', -3.4653, -62.2159, 'real', 'BR', 'South America', NULL),
('6930aa4c-f304-40d9-bd06-c6940f78a7f3', 'Japan', 35.6762, 139.6503, 'real', 'JP', 'Asia', NULL),
('8d989653-0ffd-42a6-9da2-b66a7d58ec22', 'United States', 39.9526, -75.1652, 'real', 'US', 'North America', NULL),
('6202afe3-c443-4ce6-8b50-a00ab0df3e20', 'United States', 40.7128, -74.006, 'real', 'US', 'North America', NULL),
('29c4aa59-2355-4288-8db3-5cee4458d6c4', 'United States', 41.0854, -73.8621, 'real', 'US', 'North America', NULL),
('df1a2da9-e7c1-4ceb-bbd5-54427052b261', 'United States', 42.1792, -74.0235, 'real', 'US', 'North America', NULL),
('ee3343b9-1a77-42d9-9382-10e8b10b86c1', 'United States', 42.3601, -71.0589, 'real', 'US', 'North America', NULL),
('3b4879f0-a168-4156-a6fb-3cf208576a73', 'United States', 42.5195, -70.8967, 'real', 'US', 'North America', NULL),
('5005ac89-2350-4564-b30d-a7e3689baa37', 'Canada', 64.0582, -139.429, 'real', 'CA', 'North America', NULL),
('cf6e2852-8852-40cb-93ba-a775833fc359', 'Caribbean', 18.2208, -66.5901, 'real', 'XX', 'Caribbean', NULL),
('186dec44-309b-49ef-8d16-a24568e9fcb2', 'England', 51.5074, -0.1278, 'real', 'GB', 'Europe', NULL),
('b3ae1439-668d-4799-b6ae-4197e68efc31', 'England', 52.531, -1.2969, 'real', 'GB', 'Europe', NULL),
('61c0a130-3400-4eb8-901d-12febf8b57dd', 'England', 51.3758, -1.3631, 'real', 'GB', 'Europe', NULL),
('ad229170-403f-4277-8dcf-69049bc88d5b', 'Russia', 44.4958, 34.1663, 'real', 'RU', 'Eastern Europe', NULL),
('9ff1e26b-0fbb-41ff-8d91-8d7afb579f49', 'Russia', 59.9343, 30.3351, 'real', 'RU', 'Eastern Europe', NULL),
('5d03e8be-0fea-47cc-9e2a-fdebf267692b', 'France', 48.8566, 2.3522, 'real', 'FR', 'Western Europe', NULL),
('35a4aa18-bdb3-4f87-a029-ed1f0bfe9b6a', 'France', 49.4431, 1.0993, 'real', 'FR', 'Western Europe', NULL),
('bc66d580-1023-4fd7-b5cf-a45d4dfcdd55', 'France', 48.3158, 7.4412, 'real', 'FR', 'Western Europe', NULL),
('7addc914-01b9-4488-9a53-9061ae5dfffb', 'Austria-Hungary', 50.0755, 14.4378, 'real', 'AT', 'Central Europe', NULL),
('6321d5ef-c707-443f-99fb-c1ee75ef0bbb', 'Japan', 35.0116, 135.7681, 'real', 'JP', 'East Asia', NULL),
('56355b4d-f4f8-4ef7-92c8-8dd9f0288c7e', 'Japan', 34.9937, 135.748, 'real', 'JP', 'East Asia', NULL),
('32cb6b83-4e1c-464e-9619-d2bf0eca1bc3', 'China', 31.2304, 120.5859, 'real', 'CN', 'East Asia', NULL),
('c392a103-cfaf-40bb-88d2-55634a6d7f38', 'Middle East', 33.3152, 44.3661, 'real', 'IQ', 'Middle East', NULL),
('f9e6e689-38d3-4221-826a-c51a368d40a4', 'Nigeria', 9.082, 8.6753, 'real', 'NG', 'Africa', NULL);

-- Insert themes
INSERT INTO themes (id, name, description) VALUES
('e66be18c-b755-4cf6-9a1d-63cec8924e49', 'Class prejudice', NULL),
('43f1563f-132b-4256-bfea-695345208b60', 'Language', NULL),
('6fcb795a-2be7-4378-8ad9-0f85d20f2d1c', 'Psychological deterioration', NULL),
('60ec8c7d-d345-47a2-a150-cad36fb88e70', 'Greed', NULL),
('611a19bd-d856-4f33-a665-9e056334d541', 'Isolation', NULL),
('ccfbc65c-8600-45fc-bd9a-39c2210a09b4', 'Supernatural warnings', NULL),
('57487193-1381-4ef2-8cb4-9e58f166d4b1', 'Alienation', NULL),
('21e5f677-fc65-4772-95b0-650a3d711258', 'Industrialization', NULL),
('073ab194-8da2-4afd-a92d-69712865cb2e', 'Civilization vs. savagery', NULL),
('79e8e3dc-fc2f-4389-a1f6-2c5ee5188138', 'Hypocrisy', NULL),
('6f06af9d-ae6a-4c3d-833e-fe26d6f4793b', 'American identity', NULL),
('535e1575-3100-4329-bba0-3cc5258051b0', 'Loss', NULL),
('59f8af83-2601-4cf8-8589-83285ecce332', 'Poverty', NULL),
('8bf3fcfa-21ee-4022-a5b8-5e1da2f667dd', 'Perfection', NULL),
('2a9a09be-b489-423d-a83d-4b19dd57c9c8', 'Women''s rights', NULL),
('46d1bdcb-7c5b-4d0d-b83d-7c2e3b48e9de', 'Gift-giving', NULL),
('26bca31c-af78-4424-8777-24ad1567de64', 'Education', NULL),
('b84260a9-5ff5-45db-892a-cdea548da4b4', 'Grief', NULL),
('203fcdbd-35a2-43c2-a12d-c957137386e5', 'Ghostly revenge', NULL),
('f261b5f8-256e-458b-8856-1e60fbb00949', 'Work', NULL),
('388ae74e-ec9d-4478-82ad-1d76cf802d1a', 'Family', NULL),
('2e83d874-9a65-4e94-890d-8e9ccad93815', 'Patriotism', NULL),
('8453ffa4-a18c-465c-b486-cebb95664f47', 'Science vs. nature', NULL),
('f7d97a7a-b5dc-4fc5-bc26-86c1c495c89f', 'Dehumanization', NULL),
('9d4f9f07-bef0-413b-ae6c-7113bdfd362b', 'Truth', NULL),
('1c1110cd-4538-4ac5-b610-66b25b3cef46', 'Disillusionment', NULL),
('af5dd33f-e71b-4e1b-8cda-758dedded510', 'Outsiders', NULL),
('085134e2-c289-411f-a3c9-3b617d21c475', 'Patriarchy', NULL),
('ed576e4e-f63f-4c72-85f5-240c44ac7460', 'Imagination', NULL),
('815549ea-f6c1-45f6-8f6f-212139315cbe', 'Cleverness', NULL),
('4880b79b-56d3-4335-acd5-75485e05c9c1', 'Medical misunderstanding', NULL),
('86b77d57-fce5-40c8-a74f-eb01be967f6d', 'Nature', NULL),
('21a4b691-1b19-4d45-80e3-1b85a669f7a3', 'Dignity', NULL),
('c42a0ff6-a328-4953-8afe-27102ae46cad', 'Beauty', NULL),
('80f022ef-2d55-487b-a2de-3143c454eb3c', 'Survival', NULL),
('76b54d28-85cc-4bab-9117-58e8f2879e92', 'Fate', NULL),
('fae1320f-4526-4ef9-825f-e39feb2cdebd', 'Pride', NULL),
('6affff6d-3d56-446e-9547-9b8142df2583', 'Nervousness', NULL),
('cadd571f-e0b1-45af-a358-5b172b9b8d1c', 'Bureaucracy', NULL),
('f734c13c-13b9-4db7-9d0d-75bade3a1b50', 'Mythical', NULL),
('e2016842-3e5d-4f06-8fea-969c5027527f', 'Social status', NULL),
('30c2ed42-6acf-435e-b960-b01058b2d130', 'Infidelity', NULL),
('3d862f4f-4381-43ff-9994-5ee20cd0da4d', 'Honor', NULL),
('199b1b23-d27b-4c07-a140-992a0c053b2c', 'Art', NULL),
('77f7192f-4a81-4e05-baab-c74332de41b4', 'Obsolescence', NULL),
('48d08f18-b977-43ce-a8b9-3b27d1663318', 'Social change', NULL),
('89e56645-5a8e-4165-b30c-7e2c8b866515', 'Passage of time', NULL),
('701bebaf-723c-49a0-aa14-f2bf124c7f17', 'Materialism', NULL),
('e5ff9939-4efc-44e3-8793-2b6984ceb525', 'Relationships', NULL),
('69d56a8a-caea-480e-83fa-9c4bedbe8ede', 'Misunderstanding', NULL),
('575cfd36-e9f0-473b-820a-b4d23dfbfbe3', 'Justice', NULL),
('5162959c-12a2-4ee9-bd0c-29a88864a0f6', 'Madness', NULL),
('ee874d1a-aa98-40ca-8a16-69c9efc52fba', 'Sacrifice', NULL),
('6ca75dcc-82b2-4fcc-ad97-772e459535ee', 'Instinct vs. intellect', NULL),
('ebb7b2bf-a51a-4d1e-a9d4-51dae5c51bf6', 'Change', NULL),
('e570d58e-e410-4c7b-9e84-8c6900e0b23f', 'Murder', NULL),
('120d62e3-0796-454a-b693-8bf2997d5702', 'Longing', NULL),
('233ba569-219b-4e4c-9f34-30220065c5bf', 'Gambling', NULL),
('5b461e9a-5d1b-432a-922d-de2a3312de86', 'Mortality', NULL),
('98d4e76d-f362-42dd-8ca8-607632669306', 'Folklore', NULL),
('2f861ff9-7d96-43f7-9b48-c2b784736012', 'Storytelling', NULL),
('63a342f8-de76-45c9-8bc6-566d4f7eee16', 'Guilt', NULL),
('f23902ca-7960-470e-8d2a-2c70ff7dd2e1', 'Revolution', NULL),
('6206724d-2a48-4b30-ad1e-bf2a87106125', 'Love', NULL),
('5efdd528-f37c-45dc-993f-8423ba2457ed', 'Consequences', NULL),
('bbab02ec-e289-4aef-8e4d-f797be4765d0', 'Aging', NULL),
('fc502603-353e-4720-acb2-430018f7f8f7', 'Superstition', NULL),
('04f80cb0-cd5a-4160-a595-9d250870ac21', 'Escape from responsibility', NULL),
('b79639dd-fe54-4ecb-b70e-7bb9ea6df771', 'Ambition', NULL),
('1b760a92-8a19-4a85-a479-afa1368bde09', 'Body swapping', NULL),
('643796cf-df0a-4c25-901a-71fa868a54b9', 'Mental health', NULL),
('5fa0de15-4fbf-4878-b43f-e5cdfdb24a71', 'Morality of killing', NULL),
('821f51ba-36d7-46ad-8526-c120b4c94be6', 'Self-deception', NULL),
('48ec9fe9-cefa-44d8-a353-1069122b465c', 'Hubris', NULL),
('ce2ebd58-0f20-4fee-a337-f58c58eb988c', 'Social conventions', NULL),
('de9e4595-ea4b-459e-88b6-f776e670ebc1', 'Supernatural', NULL),
('632b4d4a-9662-4e28-bfdf-ddbc676b1d37', 'Paranoia', NULL),
('1494ee97-2bb8-4f1f-b093-67346fc0046a', 'National character', NULL),
('dba31259-3985-485f-b4a5-ba84ebbcf2d9', 'Man vs. nature', NULL),
('95825f23-6d9f-4b47-9472-20fd33df94e6', 'Class', NULL),
('66b97d5e-ca99-4765-bd75-71b2fa040a31', 'Social breakdown', NULL),
('d2a81b16-98f5-4f45-89ab-596b4ca52c66', 'Identity', NULL),
('3279e7f5-3023-4ce3-94bc-3e30656213b5', 'Human nature', NULL),
('bb27b383-1776-43ed-938c-d0b2430db1f2', 'Moral ambiguity', NULL),
('ab10b144-5e11-470a-956a-a239c547bc74', 'Scientific ethics', NULL),
('d9532720-755d-4c54-8223-c74bc2919e63', 'Absurdity', NULL),
('d8a38014-e3e0-44e1-95d2-6500211be9e4', 'Societal constraints', NULL),
('a2edc8bf-5175-4ad7-8f00-d287a9983a77', 'Hospitality', NULL),
('b1df8938-0ff5-4613-92de-0def7ac002ae', 'Confinement', NULL),
('a9073e54-86d6-4c6b-8980-035a11aa943b', 'Perspective', NULL),
('99c63ffa-133e-4c49-93f0-51558a127789', 'Deception', NULL),
('06c84695-d756-454c-8f4e-20a0dea8bab5', 'Natural elements', NULL),
('18b16804-b93c-44ac-ae2c-d841af68bfa0', 'Irony', NULL),
('0e530f86-31b7-4ab0-bba7-c5eebc03028c', 'Urban', NULL),
('85476eb8-936f-4ff2-98b4-ff4903d3ad18', 'Hunter vs. hunted', NULL),
('32f804c2-4ca4-45c8-b1cd-0b47c421cbaf', 'Obsession', NULL),
('141b0e29-055e-48cd-9b14-7d0fc496148e', 'Dedication', NULL),
('1dcbae87-f67d-4146-a999-c79b1efcb5a3', 'Rural American life', NULL),
('25d0030e-34fc-4e59-b537-d00e30ce873c', 'Unintended consequences', NULL),
('255246df-d5cb-4a98-b1c2-1ea87b69072d', 'Moral corruption', NULL);

-- Insert stories
INSERT INTO stories (id, title, slug, original_language, original_text, summary, reading_time_minutes, publication_year, is_public_domain, source_url) VALUES
('7c319cc6-eeda-44c6-9dae-e3a44d685901', 'The Mountain''s Secret', 'the-mountains-secret', 'en', 'The old Sherpa guide, Mingma, had climbed these mountains for over forty years, but he had never taken foreigners to the hidden valley. It was a place known only to his people, a sanctuary where the mountain spirits dwelled.\n\nBut this season had been difficult. The changing climate had made traditional routes treacherous, and the foreign climbers who hired him were growing impatient. When the American expedition leader, Dr. Harrison, showed him an old map with the valley clearly marked, Mingma felt a cold unease settle in his stomach.\n\n\"This route,\" Dr. Harrison had said, tapping the faded parchment, \"will give us a competitive advantage. No one has documented this approach to the summit.\"\n\nMingma had tried to dissuade him. \"The valley is sacred to my people. It is not a path for outsiders.\"\n\nBut Dr. Harrison had merely smiled. \"We''ll be respectful. Scientific progress requires exploration.\"\n\nAnd so, against his better judgment, Mingma led the five climbers into the valley as the morning mist still clung to the ancient rhododendron forests. The foreigners marveled at the untouched beauty, taking photographs and samples, oblivious to Mingma''s growing discomfort.\n\nBy midday, they had reached the stone circle—seven weathered monoliths arranged in a perfect circle around a flat altar stone. Dr. Harrison was ecstatic, immediately setting up equipment to document the find.\n\n\"Please,\" Mingma warned, \"we should not linger here.\"\n\nBut the scientists were too engrossed in their discovery to heed his words. As the sun began to set, casting long shadows across the valley floor, a wind rose from nowhere, carrying with it a scent of juniper and something older—something that reminded Mingma of the high caves where his ancestors were laid to rest.\n\n\"We must leave now,\" he insisted, but his words were lost in a sudden swirl of mist that enveloped the stone circle.\n\nWhen it cleared moments later, Dr. Harrison and his team were gone. Only their equipment remained, scattered across the ground as if dropped in haste.\n\nMingma was alone—or so he thought until he saw the figure standing by the central stone. It appeared to be an old man dressed in the traditional garb of a Sherpa from generations past, but his eyes reflected the ancient glaciers.\n\n\"They did not listen,\" the figure said in a dialect so old that Mingma barely understood it.\n\n\"Where are they?\" Mingma asked, his voice barely a whisper.\n\n\"They have been shown the true paths of the mountain,\" the figure replied. \"As all who disrespect these sacred grounds must be.\"\n\n\"Will they return?\"\n\nThe ancient one considered this. \"Perhaps. When they understand that the mountain does not yield its secrets to those who seek to conquer it, but only to those who come with reverence.\"\n\nMingma nodded, understanding at last why his grandfather had warned him never to guide outsiders to this place.\n\n\"And you, Mingma, son of Dorje,\" the figure continued, \"what will you tell those who sent them?\"\n\nMingma looked down at the abandoned equipment, then back at the ancient guardian. \"I will tell them that the mountain keeps its own counsel, and that some paths are not meant to be mapped.\"\n\nThe figure nodded, and then seemed to dissolve into the mist that was once again rolling through the valley.\n\nMingma gathered what he could carry and began the long journey back alone. Behind him, the stone circle stood silent, guarding secrets that would remain hidden from the world of men for a while longer.\n\nWhen search parties came looking for the missing expedition, Mingma told them of an avalanche that had swept the scientists away. It was easier than the truth. And on each subsequent season, when climbers would ask about the hidden valley route, Mingma would shake his head and say simply, \"The mountain does not wish it.\"\n\nAnd they, seeing the certainty in his eyes, would not ask again.', 'A Sherpa guide encounters an ancient guardian spirit while leading climbers through a hidden valley near Everest.', 7, NULL, true, NULL),
('3cffbe49-2130-4819-a35e-b96558d87f10', 'River Spirits', 'river-spirits', 'en', 'The river knew secrets that the people of Porto do Céu could only guess at. It carried whispers from distant mountains, stories from other villages, and—some said—messages from the spirit world. Twelve-year-old Luiza believed these tales more than most.\n\nIt was the night of the River Festival, when the waters of the Amazon rose to their highest point, and the boundary between worlds grew thin. Colorful lanterns hung from every house in the floating village, their reflections dancing on the dark water like fallen stars.\n\nLuiza''s grandmother had warned her to stay close during the festivities. \"The Boto comes on nights like these,\" she had said, her eyes serious above her smile. \"Looking for pretty young girls to charm.\"\n\nThe Boto—the pink river dolphin that could transform into a handsome man. Luiza had heard the stories since she was small: how he would appear at festivals dressed all in white, wearing a hat to hide the blowhole he could never fully transform away, how he would seduce young women and disappear before dawn, returning to the river.\n\nLuiza wasn''t afraid. At twelve, she was too young to be of interest to the Boto, and too old to believe in such tales without question. Still, she kept her eyes open as she navigated through the crowd, balancing carefully on the wooden walkways that connected the floating homes.\n\nThe music grew louder as she approached the central platform where the celebration was in full swing. Couples danced to the rhythm of drums and flutes, their feet stamping in time on the wooden boards. The aroma of grilled fish and sweet manioc cakes filled the air.\n\nThat''s when she saw him—a young man standing at the edge of the platform, partially hidden in shadow. He was dressed in white from head to toe, and though he smiled at the dancers, he remained apart from them. Something about his stillness amid the movement caught Luiza''s attention.\n\nAs if sensing her gaze, he turned. Even in the dim light, she could see his eyes were the deep gray of river water at dusk. He smiled at her, and Luiza felt a strange recognition, though she was certain she had never seen him before.\n\nWithout thinking, she moved toward him, weaving through the dancers. But before she could reach him, her cousin Miguel grabbed her arm.\n\n\"Mamãe is looking for you,\" he shouted over the music. \"Come help with the food.\"\n\nWhen Luiza looked back, the man in white was gone. Disappointed but obedient, she followed Miguel to where her aunt was serving food to the villagers.\n\nHours later, as the celebration continued under the star-filled sky, Luiza slipped away to the quiet edge of the village. The wooden platform here extended out over the dark water, and she sat with her feet dangling above the river''s surface.\n\n\"You should be careful,\" came a voice beside her. \"The river can be unpredictable.\"\n\nLuiza startled. It was the man in white, now sitting beside her though she hadn''t heard him approach. Up close, she could see he was younger than she had first thought—perhaps sixteen or seventeen.\n\n\"I''ve lived on this river my whole life,\" she replied, trying to sound braver than she felt. \"I know its moods.\"\n\nHe smiled. \"Do you? I think the river still has many secrets to share with you.\"\n\nThere was something in his voice that reminded Luiza of the current—smooth on the surface but with hidden depths. She noticed he wore a woven bracelet of river reeds around his wrist, similar to one her grandmother had made for her last birthday.\n\n\"Are you from upriver?\" she asked. \"I don''t recognize you.\"\n\n\"I travel a lot,\" he said. \"But I always return to these waters. They''re home.\"\n\nHe reached into his pocket and pulled out a small object that caught the moonlight. It was a perfectly formed river pearl, iridescent and glowing.\n\n\"For you,\" he said, placing it in her palm. \"A reminder that the most beautiful things often remain hidden beneath the surface.\"\n\nBefore Luiza could thank him, shouts erupted from the central platform. The year''s fishing champion was being announced, and everyone was calling for the village elders to begin the blessing ceremony.\n\n\"You should join your family,\" the young man said. \"It''s important to honor traditions.\"\n\nLuiza nodded and stood up. \"Will you come?\"\n\nHe shook his head. \"I prefer to watch from a distance. But I''ll see you again, Luiza. The river connects us all.\"\n\nIt wasn''t until she was halfway back to the celebration that Luiza realized she had never told him her name.\n\nThe next morning, Luiza woke early and went straight to the water''s edge. The pearl sat on her bedside table, confirmation that the strange encounter hadn''t been a dream. As she looked out over the misty river, a flash of pink broke the surface—a river dolphin, arcing gracefully before disappearing back into the depths.\n\nLuiza smiled and whispered, \"Until we meet again.\"\n\nIn her hand, the pearl seemed to pulse with a light of its own, like a tiny captured star. Or perhaps, she thought, like a promise from the river itself.', 'A young girl from a riverside community encounters the mythical Boto Encantado during the annual river festival.', 5, NULL, true, NULL),
('f4a55f7e-58d7-4b20-a413-d413940df855', 'City of Dreams', 'city-of-dreams', 'en', 'Kenji Matsuda had worked at the same securities firm in Shinjuku for fifteen years. Each day was identical to the last: the same crowded morning train, the same convenience store coffee, the same reports to file before the markets opened in New York. He had stopped noticing the city around him years ago.\n\nIt was nearly midnight when he finally left the office tower. A light rain had begun to fall, blurring the neon signs and turning the streets into mirrors. Kenji had missed the last express train and would have to take the local line, adding another forty minutes to his commute. He sighed and opened his umbrella.\n\nHe decided to cut through the narrow alleyways behind the main boulevard—a route he rarely took. The rain muffled the sounds of the city, creating an unusual pocket of silence. That''s when he noticed the door.\n\nIt was painted a deep blue that seemed to glow against the gray concrete wall. Kenji was certain it hadn''t been there before—he would have remembered such an unusual color in this monochrome part of the city. There was no sign, no indication of what might lie beyond it.\n\nPerhaps it was the lateness of the hour, or perhaps it was the strange quality of the rain-soaked night, but something compelled Kenji to approach the door. When he touched the handle, it was warm despite the cool air.\n\nHe opened it.\n\nInstead of a room or a hallway, Kenji found himself stepping onto a street that was both familiar and utterly changed. It was still Tokyo—he could see the distant silhouette of Tokyo Tower—but the crowded buildings had been transformed. Plants and vines cascaded from every balcony and rooftop. The street itself was free of cars, replaced by channels of clear flowing water. Bridges arched gracefully between buildings, and paper lanterns floated in the air without any visible means of support.\n\nKenji turned back, but the blue door had vanished. Where it had stood was now a solid wall covered in a mural of swimming koi.\n\n\"First time crossing over?\"\n\nKenji spun around to find an elderly man in a traditional indigo jacket watching him with amusement.\n\n\"I... where am I?\" Kenji asked.\n\n\"Tokyo,\" the old man replied simply. \"Just... a different layer of it. The city dreams at night, you see, and sometimes those dreams take form.\"\n\n\"I don''t understand,\" Kenji said.\n\n\"No one does at first,\" the old man said, gesturing to the cushion across from him.\n\nKenji sat, and the man poured him a cup of tea that steamed with impossible colors.\n\n\"Tokyo has many faces,\" the old man explained. \"The one you know is just the most recent mask it wears. But underneath, there are older versions that still exist in the spaces between moments. This Tokyo remembers the canals that once flowed through Edo. It remembers the gardens that stood where skyscrapers now reach for the clouds.\"\n\n\"But how is this possible?\" Kenji asked.\n\nThe old man smiled. \"The city is more than concrete and steel. It''s made of stories and memories and dreams. Those who have forgotten how to see can sometimes stumble into these hidden layers—especially between midnight and dawn, when the boundaries grow thin.\"\n\nKenji looked around at the transformed city. In the distance, he could see a traditional wooden pagoda rising where the Metropolitan Government Building should stand. Cherry blossoms bloomed despite the season, their petals drifting down to float on the canal waters.\n\n\"Can I... explore?\" Kenji asked hesitantly.\n\n\"Of course,\" the old man said. \"That''s why you''re here. But remember, you must return before dawn. The doorways close when the first train runs.\"\n\nKenji spent hours wandering through the dream Tokyo. He crossed bridges where salarymen like himself would normally be hurrying to work. He passed tea houses filled with patrons in kimonos who nodded to him as if he were a regular customer. Street vendors offered him foods he remembered from his grandmother''s kitchen—tastes that had been lost to time and convenience.\n\nIn a small park that should have been a parking structure, Kenji found a group of children playing with tops and paper balloons. They invited him to join their game, and for the first time in years, he felt the simple joy of play.\n\nAs the night deepened, Kenji found himself in a garden overlooking the city. Fireflies danced among the carefully pruned trees, and the moon seemed impossibly large in the sky.\n\n\"It''s beautiful here,\" he said to no one in particular.\n\n\"It''s your Tokyo too,\" came a voice. A woman in a summer yukata stood nearby, her face half-hidden by a folding fan. \"It''s always been here, waiting for you to remember it.\"\n\n\"I never knew,\" Kenji said.\n\n\"Few do anymore,\" she replied. \"They move through the city with their eyes on screens, never looking up to see the magic that surrounds them. They''ve forgotten that cities are living things with many layers of history and meaning.\"\n\nShe pointed to the horizon, where the sky was beginning to lighten almost imperceptibly.\n\n\"Dawn approaches,\" she said. \"You should find your way back.\"\n\n\"How?\" Kenji asked, suddenly anxious. \"The door disappeared.\"\n\nShe smiled. \"Doors appear for those who need them. Look for the color that feels like home.\"\n\nKenji made his way back through the dream city as the stars began to fade. The streets were emptying, the lanterns dimming. He felt a growing urgency with each step.\n\nThen he saw it—a red door set into a stone wall. The color reminded him of the lacquered box where his mother had kept her most precious photographs. Without hesitation, he turned the handle and stepped through.\n\nHe emerged into the familiar alleyway, now bathed in the gray light of early morning. The rain had stopped, and the city was stirring to life. Checking his watch, Kenji was startled to see it was 5:30 AM—the exact time the first train would be departing.\n\nHe made his way to the station, his mind filled with images of the dream Tokyo. As he waited on the platform, he noticed details he had overlooked for years—the pattern of tiles on the floor, the calligraphy on a shop sign, the way the light filtered through the station''s glass ceiling.\n\nWhen Kenji arrived at work that morning, his colleagues commented on his changed appearance.\n\n\"Did something good happen?\" his assistant asked. \"You seem... different.\"\n\nKenji smiled. \"I just saw the city with new eyes.\"\n\nThat night, and many nights after, Kenji would leave work early enough to walk home, taking different routes through the city, observing the details and textures of Tokyo''s many layers. He never found the blue door again, but sometimes, in the quiet moments between midnight and dawn, he would catch glimpses of paper lanterns floating above the traffic, or hear the distant sound of shamisen music drifting from an alleyway.\n\nAnd on his desk at home, he kept a small jar of water from the dream city''s canal—water that never evaporated and sometimes, when the light hit it just right, seemed to contain an entire world within its depths.', 'A Tokyo businessman follows a mysterious blue door into a hidden version of the city that exists between midnight and dawn.', 8, NULL, true, NULL),
('753a84b5-7f05-4aac-a888-e94840161dd8', 'The Tell-Tale Heart', 'the-tell-tale-heart', 'en', 'TRUE!—nervous—very, very dreadfully nervous I had been and am; but why will you say that I am mad? The disease had sharpened my senses—not destroyed—not dulled them. Above all was the sense of hearing acute. I heard all things in the heaven and in the earth. I heard many things in hell. How, then, am I mad? Hearken! and observe how healthily—how calmly I can tell you the whole story.

It is impossible to say how first the idea entered my brain; but once conceived, it haunted me day and night. Object there was none. Passion there was none. I loved the old man. He had never wronged me. He had never given me insult. For his gold I had no desire. I think it was his eye! yes, it was this! He had the eye of a vulture—a pale blue eye, with a film over it. Whenever it fell upon me, my blood ran cold; and so by degrees—very gradually—I made up my mind to take the life of the old man, and thus rid myself of the eye forever.

Now this is the point. You fancy me mad. Madmen know nothing. But you should have seen me. You should have seen how wisely I proceeded—with what caution—with what foresight—with what dissimulation I went to work! I was never kinder to the old man than during the whole week before I killed him. And every night, about midnight, I turned the latch of his door and opened it—oh, so gently! And then, when I had made an opening sufficient for my head, I put in a dark lantern, all closed, closed, that no light shone out, and then I thrust in my head. Oh, you would have laughed to see how cunningly I thrust it in! I moved it slowly—very, very slowly, so that I might not disturb the old man''s sleep. It took me an hour to place my whole head within the opening so far that I could see him as he lay upon his bed. Ha!—would a madman have been so wise as this? And then, when my head was well in the room, I undid the lantern cautiously—oh, so cautiously—cautiously (for the hinges creaked)—I undid it just so much that a single thin ray fell upon the vulture eye. And this I did for seven long nights—every night just at midnight—but I found the eye always closed; and so it was impossible to do the work; for it was not the old man who vexed me, but his Evil Eye. And every morning, when the day broke, I went boldly into the chamber, and spoke courageously to him, calling him by name in a hearty tone, and inquiring how he has passed the night. So you see he would have been a very profound old man, indeed, to suspect that every night, just at twelve, I looked in upon him while he slept.

Upon the eighth night I was more than usually cautious in opening the door. A watch''s minute hand moves more quickly than did mine. Never before that night had I felt the extent of my own powers—of my sagacity. I could scarcely contain my feelings of triumph. To think that there I was, opening the door, little by little, and he not even to dream of my secret deeds or thoughts. I fairly chuckled at the idea; and perhaps he heard me; for he moved on the bed suddenly, as if startled. Now you may think that I drew back—but no. His room was as black as pitch with the thick darkness, (for the shutters were close fastened, through fear of robbers,) and so I knew that he could not see the opening of the door, and I kept pushing it on steadily, steadily.

I had my head in, and was about to open the lantern, when my thumb slipped upon the tin fastening, and the old man sprang up in bed, crying out—"Who''s there?"

I kept quite still and said nothing. For a whole hour I did not move a muscle, and in the meantime I did not hear him lie down. He was still sitting up in the bed listening;—just as I have done, night after night, hearkening to the death watches in the wall.

Presently I heard a slight groan, and I knew it was the groan of mortal terror. It was not a groan of pain or of grief—oh, no!—it was the low stifled sound that arises from the bottom of the soul when overcharged with awe. I knew the sound well. Many a night, just at midnight, when all the world slept, it has welled up from my own bosom, deepening, with its dreadful echo, the terrors that distracted me. I say I knew it well. I knew what the old man felt, and pitied him, although I chuckled at heart. I knew that he had been lying awake ever since the first slight noise, when he had turned in the bed. His fears had been ever since growing upon him. He had been trying to fancy them causeless, but could not. He had been saying to himself—"It is nothing but the wind in the chimney—it is only a mouse crossing the floor," or "It is merely a cricket which has made a single chirp." Yes, he had been trying to comfort himself with these suppositions: but he had found all in vain. All in vain; because Death, in approaching him had stalked with his black shadow before him, and enveloped the victim. And it was the mournful influence of the unperceived shadow that caused him to feel—although he neither saw nor heard—to feel the presence of my head within the room.

When I had waited a long time, very patiently, without hearing him lie down, I resolved to open a little—a very, very little crevice in the lantern. So I opened it—you cannot imagine how stealthily, stealthily—until, at length a simple dim ray, like the thread of the spider, shot from out the crevice and fell full upon the vulture eye.

It was open—wide, wide open—and I grew furious as I gazed upon it. I saw it with perfect distinctness—all a dull blue, with a hideous veil over it that chilled the very marrow in my bones; but I could see nothing else of the old man''s face or person: for I had directed the ray as if by instinct, precisely upon the damned spot.

And have I not told you that what you mistake for madness is but over-acuteness of the senses?—now, I say, there came to my ears a low, dull, quick sound, such as a watch makes when enveloped in cotton. I knew that sound well, too. It was the beating of the old man''s heart. It increased my fury, as the beating of a drum stimulates the soldier into courage.

But even yet I refrained and kept still. I scarcely breathed. I held the lantern motionless. I tried how steadily I could maintain the ray upon the eye. Meantime the hellish tattoo of the heart increased. It grew quicker and quicker, and louder and louder every instant. The old man''s terror must have been extreme! It grew louder, I say, louder every moment!—do you mark me well I have told you that I am nervous: so I am. And now at the dead hour of the night, amid the dreadful silence of that old house, so strange a noise as this excited me to uncontrollable terror. Yet, for some minutes longer I refrained and stood still. But the beating grew louder, louder! I thought the heart must burst. And now a new anxiety seized me—the sound would be heard by a neighbour! The old man''s hour had come! With a loud yell, I threw open the lantern and leaped into the room. He shrieked once—once only. In an instant I dragged him to the floor, and pulled the heavy bed over him. I then smiled gaily, to find the deed so far done. But, for many minutes, the heart beat on with a muffled sound. This, however, did not vex me; it would not be heard through the wall. At length it ceased. The old man was dead. I removed the bed and examined the corpse. Yes, he was stone, stone dead. I placed my hand upon the heart and held it there many minutes. There was no pulsation. He was stone dead. His eye would trouble me no more.

If still you think me mad, you will think so no longer when I describe the wise precautions I took for the concealment of the body. The night waned, and I worked hastily, but in silence. First of all I dismembered the corpse. I cut off the head and the arms and the legs.

I then took up three planks from the flooring of the chamber, and deposited all between the scantlings. I then replaced the boards so cleverly, so cunningly, that no human eye—not even his—could have detected any thing wrong. There was nothing to wash out—no stain of any kind—no blood-spot whatever. I had been too wary for that. A tub had caught all—ha! ha!

When I had made an end of these labors, it was four o''clock—still dark as midnight. As the bell sounded the hour, there came a knocking at the street door. I went down to open it with a light heart,—for what had I now to fear? There entered three men, who introduced themselves, with perfect suavity, as officers of the police. A shriek had been heard by a neighbour during the night; suspicion of foul play had been aroused; information had been lodged at the police office, and they (the officers) had been deputed to search the premises.

I smiled,—for what had I to fear? I bade the gentlemen welcome. The shriek, I said, was my own in a dream. The old man, I mentioned, was absent in the country. I took my visitors all over the house. I bade them search—search well. I led them, at length, to his chamber. I showed them his treasures, secure, undisturbed. In the enthusiasm of my confidence, I brought chairs into the room, and desired them here to rest from their fatigues, while I myself, in the wild audacity of my perfect triumph, placed my own seat upon the very spot beneath which reposed the corpse of the victim.

The officers were satisfied. My manner had convinced them. I was singularly at ease. They sat, and while I answered cheerily, they chatted of familiar things. But, ere long, I felt myself getting pale and wished them gone. My head ached, and I fancied a ringing in my ears: but still they sat and still chatted. The ringing became more distinct:—It continued and became more distinct: I talked more freely to get rid of the feeling: but it continued and gained definiteness—until, at length, I found that the noise was not within my ears.

No doubt I now grew very pale;—but I talked more fluently, and with a heightened voice. Yet the sound increased—and what could I do? It was a low, dull, quick sound—much such a sound as a watch makes when enveloped in cotton. I gasped for breath—and yet the officers heard it not. I talked more quickly—more vehemently; but the noise steadily increased. I arose and argued about trifles, in a high key and with violent gesticulations; but the noise steadily increased. Why would they not be gone? I paced the floor to and fro with heavy strides, as if excited to fury by the observations of the men—but the noise steadily increased. Oh God! what could I do? I foamed—I raved—I swore! I swung the chair upon which I had been sitting, and grated it upon the boards, but the noise arose over all and continually increased. It grew louder—louder—louder! And still the men chatted pleasantly, and smiled. Was it possible they heard not? Almighty God!—no, no! They heard!—they suspected!—they knew!—they were making a mockery of my horror!-this I thought, and this I think. But anything was better than this agony! Anything was more tolerable than this derision! I could bear those hypocritical smiles no longer! I felt that I must scream or die! and now—again!—hark! louder! louder! louder! louder!

"Villains!" I shrieked, "dissemble no more! I admit the deed!—tear up the planks! here, here!—It is the beating of his hideous heart!"', 'An unnamed narrator attempts to convince the reader of his sanity while describing a murder he committed against an old man with a \', 20, NULL, true, NULL),
('2f5f23bc-7958-4bbf-a1a1-ca4fedb5bb5b', 'The Gift of the Magi', 'the-gift-of-the-magi', 'en', 'One dollar and eighty-seven cents. That was all. And sixty cents of it was in pennies. Pennies saved one and two at a time by bulldozing the grocer and the vegetable man and the butcher until one''s cheeks burned with the silent imputation of parsimony that such close dealing implied. Three times Della counted it. One dollar and eighty-seven cents. And the next day would be Christmas.

There was clearly nothing to do but flop down on the shabby little couch and howl. So Della did it. Which instigates the moral reflection that life is made up of sobs, sniffles, and smiles, with sniffles predominating.

While the mistress of the home is gradually subsiding from the first stage to the second, take a look at the home. A furnished flat at $8 per week. It did not exactly beggar description, but it certainly had that word on the lookout for the mendicancy squad.

In the vestibule below was a letter-box into which no letter would go, and an electric button from which no mortal finger could coax a ring. Also appertaining thereunto was a card bearing the name "Mr. James Dillingham Young."

The "Dillingham" had been flung to the breeze during a former period of prosperity when its possessor was being paid $30 per week. Now, when the income was shrunk to $20, though, they were thinking seriously of contracting to a modest and unassuming D. But whenever Mr. James Dillingham Young came home and reached his flat above he was called "Jim" and greatly hugged by Mrs. James Dillingham Young, already introduced to you as Della. Which is all very good.

Della finished her cry and attended to her cheeks with the powder rag. She stood by the window and looked out dully at a gray cat walking a gray fence in a gray backyard. Tomorrow would be Christmas Day, and she had only $1.87 with which to buy Jim a present. She had been saving every penny she could for months, with this result. Twenty dollars a week doesn''t go far. Expenses had been greater than she had calculated. They always are. Only $1.87 to buy a present for Jim. Her Jim. Many a happy hour she had spent planning for something nice for him. Something fine and rare and sterling—something just a little bit near to being worthy of the honor of being owned by Jim.

There was a pier glass between the windows of the room. Perhaps you have seen a pier glass in an $8 flat. A very thin and very agile person may, by observing his reflection in a rapid sequence of longitudinal strips, obtain a fairly accurate conception of his looks. Della, being slender, had mastered the art.

Suddenly she whirled from the window and stood before the glass. Her eyes were shining brilliantly, but her face had lost its color within twenty seconds. Rapidly she pulled down her hair and let it fall to its full length.

Now, there were two possessions of the James Dillingham Youngs in which they both took a mighty pride. One was Jim''s gold watch that had been his father''s and his grandfather''s. The other was Della''s hair. Had the queen of Sheba lived in the flat across the airshaft, Della would have let her hair hang out the window some day to dry just to depreciate Her Majesty''s jewels and gifts. Had King Solomon been the janitor, with all his treasures piled up in the basement, Jim would have pulled out his watch every time he passed, just to see him pluck at his beard from envy.

So now Della''s beautiful hair fell about her rippling and shining like a cascade of brown waters. It reached below her knee and made itself almost a garment for her. And then she did it up again nervously and quickly. Once she faltered for a minute and stood still while a tear or two splashed on the worn red carpet.

On went her old brown jacket; on went her old brown hat. With a whirl of skirts and with the brilliant sparkle still in her eyes, she fluttered out the door and down the stairs to the street.

Where she stopped the sign read: "Mme. Sofronie. Hair Goods of All Kinds." One flight up Della ran, and collected herself, panting. Madame, large, too white, chilly, hardly looked the "Sofronie."

"Will you buy my hair?" asked Della.

"I buy hair," said Madame. "Take yer hat off and let''s have a sight at the looks of it."

Down rippled the brown cascade.

"Twenty dollars," said Madame, lifting the mass with a practised hand.

"Give it to me quick," said Della.

Oh, and the next two hours tripped by on rosy wings. Forget the hashed metaphor. She was ransacking the stores for Jim''s present.

She found it at last. It surely had been made for Jim and no one else. There was no other like it in any of the stores, and she had turned all of them inside out. It was a platinum fob chain simple and chaste in design, properly proclaiming its value by substance alone and not by meretricious ornamentation—as all good things should do. It was even worthy of The Watch. As soon as she saw it she knew that it must be Jim''s. It was like him. Quietness and value—the description applied to both. Twenty-one dollars they took from her for it, and she hurried home with the 87 cents. With that chain on his watch Jim might be properly anxious about the time in any company. Grand as the watch was, he sometimes looked at it on the sly on account of the old leather strap that he used in place of a chain.

When Della reached home her intoxication gave way a little to prudence and reason. She got out her curling irons and lighted the gas and went to work repairing the ravages made by generosity added to love. Which is always a tremendous task, dear friends—a mammoth task.

Within forty minutes her head was covered with tiny, close-lying curls that made her look wonderfully like a truant schoolboy. She looked at her reflection in the mirror long, carefully, and critically.

"If Jim doesn''t kill me," she said to herself, "before he takes a second look at me, he''ll say I look like a Coney Island chorus girl. But what could I do—oh! what could I do with a dollar and eighty-seven cents?"

At 7 o''clock the coffee was made and the frying-pan was on the back of the stove hot and ready to cook the chops.

Jim was never late. Della doubled the fob chain in her hand and sat on the corner of the table near the door that he always entered. Then she heard his step on the stair away down on the first flight, and she turned white for just a moment. She had a habit of saying a little silent prayer about the simplest everyday things, and now she whispered: "Please God, make him think I am still pretty."

The door opened and Jim stepped in and closed it. He looked thin and very serious. Poor fellow, he was only twenty-two—and to be burdened with a family! He needed a new overcoat and he was without gloves.

Jim stopped inside the door, as immovable as a setter at the scent of quail. His eyes were fixed upon Della, and there was an expression in them that she could not read, and it terrified her. It was not anger, nor surprise, nor disapproval, nor horror, nor any of the sentiments that she had been prepared for. He simply stared at her fixedly with that peculiar expression on his face.

Della wriggled off the table and went for him.

"Jim, darling," she cried, "don''t look at me that way. I had my hair cut off and sold because I couldn''t have lived through Christmas without giving you a present. It''ll grow out again—you won''t mind, will you? I just had to do it. My hair grows awfully fast. Say ''Merry Christmas!'' Jim, and let''s be happy. You don''t know what a nice—what a beautiful, nice gift I''ve got for you."

"You''ve cut off your hair?" asked Jim, laboriously, as if he had not arrived at that patent fact yet even after the hardest mental labor.

"Cut it off and sold it," said Della. "Don''t you like me just as well, anyhow? I''m me without my hair, ain''t I?"

Jim looked about the room curiously.

"You say your hair is gone?" he said, with an air almost of idiocy.

"You needn''t look for it," said Della. "It''s sold, I tell you—sold and gone, too. It''s Christmas Eve, boy. Be good to me, for it went for you. Maybe the hairs of my head were numbered," she went on with sudden serious sweetness, "but nobody could ever count my love for you. Shall I put the chops on, Jim?"

Out of his trance Jim seemed quickly to wake. He enfolded his Della. For ten seconds let us regard with discreet scrutiny some inconsequential object in the other direction. Eight dollars a week or a million a year—what is the difference? A mathematician or a wit would give you the wrong answer. The magi brought valuable gifts, but that was not among them. This dark assertion will be illuminated later on.

Jim drew a package from his overcoat pocket and threw it upon the table.

"Don''t make any mistake, Dell," he said, "about me. I don''t think there''s anything in the way of a haircut or a shave or a shampoo that could make me like my girl any less. But if you''ll unwrap that package you may see why you had me going a while at first."

White fingers and nimble tore at the string and paper. And then an ecstatic scream of joy; and then, alas! a quick feminine change to hysterical tears and wails, necessitating the immediate employment of all the comforting powers of the lord of the flat.

For there lay The Combs—the set of combs, side and back, that Della had worshipped long in a Broadway window. Beautiful combs, pure tortoise shell, with jewelled rims—just the shade to wear in the beautiful vanished hair. They were expensive combs, she knew, and her heart had simply craved and yearned over them without the least hope of possession. And now, they were hers, but the tresses that should have adorned the coveted adornments were gone.

But she hugged them to her bosom, and at length she was able to look up with dim eyes and a smile and say: "My hair grows so fast, Jim!"

And then Della leaped up like a little singed cat and cried, "Oh, oh!"

Jim had not yet seen his beautiful present. She held it out to him eagerly upon her open palm. The dull precious metal seemed to flash with a reflection of her bright and ardent spirit.

"Isn''t it a dandy, Jim? I hunted all over town to find it. You''ll have to look at the time a hundred times a day now. Give me your watch. I want to see how it looks on it."

Instead of obeying, Jim tumbled down on the couch and put his hands under the back of his head and smiled.

"Dell," said he, "let''s put our Christmas presents away and keep ''em a while. They''re too nice to use just at present. I sold the watch to get the money to buy your combs. And now suppose you put the chops on."

The magi, as you know, were wise men—wonderfully wise men—who brought gifts to the Babe in the manger. They invented the art of giving Christmas presents. Being wise, their gifts were no doubt wise ones, possibly bearing the privilege of exchange in case of duplication. And here I have lamely related to you the uneventful chronicle of two foolish children in a flat who most unwisely sacrificed for each other the greatest treasures of their house. But in a last word to the wise of these days let it be said that of all who give gifts these two were the wisest. Of all who give and receive gifts, such as they are wisest. Everywhere they are wisest. They are the magi.', 'A young married couple, Jim and Della, sacrifice their most prized possessions to buy Christmas gifts for each other.', 15, NULL, true, NULL),
('9bfb504f-f731-4001-b2c0-01217de157d1', 'The Legend of Sleepy Hollow', 'the-legend-of-sleepy-hollow', 'en', 'External source: For the full text, please visit: https://www.gutenberg.org/files/41/41-h/41-h.htm#page_272', 'Ichabod Crane, a superstitious schoolmaster, competes with the local hero Brom Bones for the hand of Katrina Van Tassel, only to encounter the legendary Headless Horseman.', 45, NULL, true, NULL),
('4d6463c6-9794-4b26-80c2-cccea416b544', 'Rip Van Winkle', 'rip-van-winkle', 'en', 'External source: For the full text, please visit: https://www.gutenberg.org/files/41/41-h/41-h.htm#page_28', 'Rip Van Winkle wanders into the Catskill Mountains, meets strange men, drinks their liquor, and falls asleep for 20 years, awakening to find America transformed.', 30, NULL, true, NULL),
('d67fb0ef-a09f-476d-8543-72c44545f11d', 'The Yellow Wallpaper', 'the-yellow-wallpaper', 'en', 'External source: For the full text, please visit: https://www.gutenberg.org/files/1952/1952-h/1952-h.htm', 'A woman suffering from depression is prescribed a \', 30, NULL, true, NULL),
('0d82745c-b2ad-4e60-aff7-485d641a7d2d', 'The Birthmark', 'the-birthmark', 'en', 'External source: For the full text, please visit: https://www.gutenberg.org/files/512/512-h/512-h.htm#birthmark', 'A scientist becomes obsessed with removing a small hand-shaped birthmark from his wife''s cheek, with tragic consequences.', 35, NULL, true, NULL),
('7310009c-d0e4-41a4-8aa3-86017ac3da36', 'To Build a Fire', 'to-build-a-fire', 'en', 'External source: For the full text, please visit: https://www.gutenberg.org/files/910/910-h/910-h.htm#to-build-a-fire', 'An unnamed man travels through the freezing Yukon Territory, ignoring warnings and struggling to build a life-saving fire as temperatures plummet.', 40, NULL, true, NULL),
('2caf1b69-d04b-48c2-a2b1-056af69d7ee4', 'The Most Dangerous Game', 'the-most-dangerous-game', 'en', 'External source: For the full text, please visit: https://www.gutenberg.org/cache/epub/1872/pg1872-images.html', 'After falling off a yacht, renowned hunter Sanger Rainsford swims to a nearby island where he meets General Zaroff, a Russian aristocrat who hunts humans for sport.', 45, NULL, true, NULL),
('04b5f2ad-63a4-436a-8bfd-deb328b7ce6c', 'The Monkey''s Paw', 'the-monkeys-paw', 'en', 'External source: For the full text, please visit: https://www.gutenberg.org/files/12122/12122-h/12122-h.htm#THE_MONKEY%27S_PAW', 'A family receives a mummified monkey''s paw that grants three wishes with terrible consequences.', 25, NULL, true, NULL),
('ee364418-59f6-4a5c-b61e-e19060e1944f', 'The Story of the Late Mr. Elvesham', 'the-story-of-the-late-mr-elvesham', 'en', 'External source: For the full text, please visit: https://www.gutenberg.org/files/11870/11870-h/11870-h.htm#story', 'A young medical student is befriended by an elderly philosopher who switches bodies with him through a drugged drink.', 30, NULL, true, NULL),
('d00a72c9-4c8f-44a9-9e4f-e77bd3c50827', 'The Open Window', 'the-open-window', 'en', 'External source: For the full text, please visit: https://www.gutenberg.org/files/269/269-h/269-h.htm#link2H_4_0001', 'A nervous man visiting the countryside is told a tragic ghost story by a young girl with a talent for mischief.', 15, NULL, true, NULL),
('61bf51df-ccb5-4623-b1d4-c2a71dc3b136', 'The Signal-Man', 'the-signal-man', 'en', 'External source: For the full text, please visit: https://www.gutenberg.org/files/1289/1289-h/1289-h.htm#link2H_4_0003', 'A signal-man working at an isolated railway cutting tells the narrator about ghostly apparitions that have appeared before tragic accidents on the line.', 35, NULL, true, NULL),
('cbd83e9f-3d67-42b4-b9b7-2f43b116e644', 'The Lady with the Dog', 'the-lady-with-the-dog', 'en', 'External source: For the full text, please visit: https://www.gutenberg.org/files/13415/13415-h/13415-h.htm#THE_LADY_WITH_THE_DOG', 'Dmitri Gurov, an unhappily married Moscow banker, begins an affair with Anna Sergeyevna, a young married woman, while both are vacationing in Yalta.', 40, NULL, true, NULL),
('3278ce81-d985-4637-988e-77d7c8b20664', 'The Nose', 'the-nose', 'en', 'External source: For the full text, please visit: https://www.gutenberg.org/files/36238/36238-h/36238-h.htm#THE_NOSE', 'Collegiate Assessor Kovalyov wakes up one morning to discover his nose has disappeared from his face and is now living an independent life as a higher-ranking official.', 45, NULL, true, NULL),
('ddfa649e-934c-4cf8-91c4-1e05cdc4d2f0', 'The Queen of Spades', 'the-queen-of-spades', 'en', 'External source: For the full text, please visit: https://www.gutenberg.org/files/55024/55024-h/55024-h.htm#THE_QUEEN_OF_SPADES', 'Hermann, a young Russian officer, becomes obsessed with learning a secret card-playing formula from an elderly countess, with supernatural consequences.', 50, NULL, true, NULL),
('d5bc880b-89e3-4eb8-82b6-f4e63f99edc3', 'The Overcoat', 'the-overcoat', 'en', 'External source: For the full text, please visit: https://www.gutenberg.org/files/36238/36238-h/36238-h.htm#THE_CLOAK', 'Akaky Akakievich, a poor copying clerk, saves for months to buy a new overcoat that transforms his life, only to have it stolen, leading to his death and ghostly return.', 55, NULL, true, NULL),
('6b5a5bab-cb6d-4c60-9071-cb95b01bf8ca', 'The Necklace', 'the-necklace', 'en', 'External source: For the full text, please visit: https://www.gutenberg.org/files/3090/3090-h/3090-h.htm#link2H_4_0013', 'Mathilde Loisel borrows a diamond necklace for a high-society event, loses it, and spends ten years in poverty to replace it, only to discover the original was a fake.', 25, NULL, true, NULL),
('47483ce4-df10-44b3-81b8-ab924b78ab8b', 'Ball of Fat', 'ball-of-fat', 'en', 'External source: For the full text, please visit: https://www.gutenberg.org/files/3090/3090-h/3090-h.htm#link2H_4_0001', 'During the Franco-Prussian War, a group of French citizens pressure a prostitute to sleep with a Prussian officer for their benefit, then treat her with contempt after her sacrifice.', 60, NULL, true, NULL),
('f264e91e-0409-4ffd-ade4-e5a9288d6bbb', 'The Last Lesson', 'the-last-lesson', 'en', 'External source: For the full text, please visit: https://www.gutenberg.org/files/31253/31253-h/31253-h.htm#THE_LAST_LESSON', 'Young Franz discovers it is the last day French will be taught in his Alsatian village after the region''s annexation by Prussia following the Franco-Prussian War.', 20, NULL, true, NULL),
('ef9b6828-f33d-4d2e-823b-7672a73bf6c4', 'A Hunger Artist', 'a-hunger-artist', 'en', 'External source: For the full text, please visit: https://www.kafka-online.info/a-hunger-artist.html', 'A professional faster performs the art of starvation for public entertainment, but as interest in fasting wanes, he is relegated to a neglected cage in a circus.', 30, NULL, true, NULL),
('37175469-a552-4750-a691-1f066ed2a616', 'The Metamorphosis', 'the-metamorphosis', 'en', 'External source: For the full text, please visit: https://www.gutenberg.org/files/5200/5200-h/5200-h.htm', 'Gregor Samsa wakes one morning to find himself transformed into a giant insect, leading to his family''s horror, neglect, and eventual relief after his death.', 90, NULL, true, NULL),
('affcd6f7-8336-4784-9dfe-4231bc1e20f6', 'In a Grove', 'in-a-grove', 'en', 'External source: For the full text, please visit: https://www.gutenberg.org/files/69606/69606-h/69606-h.htm', 'Multiple, contradictory accounts of a samurai''s murder are presented, revealing the self-serving nature of each narrator and leaving the truth ambiguous.', 25, NULL, true, NULL),
('cc6b25c3-51f9-4ae7-87ed-800191fdcd0d', 'Rashomon', 'rashomon', 'en', 'External source: For the full text, please visit: https://www.gutenberg.org/files/69606/69606-h/69606-h.htm', 'During a time of famine in Kyoto, an unemployed servant takes shelter in the dilapidated Rashomon gate and encounters an old woman stealing hair from corpses.', 20, NULL, true, NULL),
('eb428426-4daa-4d37-9423-55ef0a84d874', 'The True Story of Ah Q', 'the-true-story-of-ah-q', 'en', 'External source: For the full text, please visit: https://www.marxists.org/archive/lu-xun/1921/12/ah-q/index.htm', 'Ah Q, an uneducated peasant known for his \', 70, NULL, true, NULL),
('1fc97f86-7be1-42f9-a07a-eb9f53c7e089', 'The Arabian Nights (Selected Tales)', 'the-arabian-nights-selected-tales', 'en', 'External source: For the full text, please visit: https://www.gutenberg.org/files/51252/51252-h/51252-h.htm', 'Scheherazade tells King Shahryar a new story each night to postpone her execution, weaving tales of adventure, romance, tragedy, comedy, and the supernatural.', 40, NULL, true, NULL),
('9978a430-3d60-4686-9879-d8a1b0d0afb2', 'Why the Sun and the Moon Live in the Sky', 'why-the-sun-and-the-moon-live-in-the-sky', 'en', 'External source: For the full text, please visit: https://www.gutenberg.org/files/39308/39308-h/39308-h.htm', 'The Sun and his wife, the Moon, invite their friend Water to visit their home, but are forced to retreat to the sky when Water and his relatives fill their house.', 10, NULL, true, NULL);

-- Insert story_authors relationships
INSERT INTO story_authors (id, story_id, author_id) VALUES
('c4da6ac3-9b58-41e2-bd92-5dfd034be8c6', '7c319cc6-eeda-44c6-9dae-e3a44d685901', '5b92ac1b-8bad-417f-8625-56a80752b9af'),
('25411e07-3b33-43ac-8a4d-5639ac63df01', '3cffbe49-2130-4819-a35e-b96558d87f10', 'f80bf5a9-149f-4d87-ad8c-e690ee208ce2'),
('29823eff-e4ca-4778-9eaa-dd4dc59e8ce2', 'f4a55f7e-58d7-4b20-a413-d413940df855', '90744b70-a16a-4379-a91c-b1517c32e938'),
('06c348dc-4b04-4197-9049-72ad91a7d604', '753a84b5-7f05-4aac-a888-e94840161dd8', '3e0e8c92-e9ec-4270-806a-2667d6b5c3ac'),
('818336cd-ccb3-4df1-9de2-4581a9b130bb', '2f5f23bc-7958-4bbf-a1a1-ca4fedb5bb5b', 'dd1838ec-e3bf-40be-a5a6-5cc56668348c'),
('e82f9507-0345-44b0-a400-8e5031f7820a', '9bfb504f-f731-4001-b2c0-01217de157d1', 'f22c5b5f-3d00-4122-b980-2d7474d8016c'),
('52f7bb85-f9f8-4d3d-a63a-dacd4c60ac59', '4d6463c6-9794-4b26-80c2-cccea416b544', 'f22c5b5f-3d00-4122-b980-2d7474d8016c'),
('d95ca946-4377-4ccd-8783-bbb0f60912cb', 'd67fb0ef-a09f-476d-8543-72c44545f11d', 'c2bbdae5-2b88-4cdb-aebb-0ec44b34a299'),
('438bf579-d770-4605-9094-b00fb2d70c8b', '0d82745c-b2ad-4e60-aff7-485d641a7d2d', '90bbbfad-36b2-4f04-89ad-d4a346efcc2c'),
('2fa51ab1-a52a-49fb-8560-f46ad2a2f2f7', '7310009c-d0e4-41a4-8aa3-86017ac3da36', 'b6e40083-2e37-4f32-8818-bcedc8cc462e'),
('52d6dc43-075e-4b60-a241-3bb38f016e3b', '2caf1b69-d04b-48c2-a2b1-056af69d7ee4', 'af3eec2e-c0e1-4db3-a330-aad3a532d6e3'),
('a18335f6-75ce-4505-acba-8627881be013', '04b5f2ad-63a4-436a-8bfd-deb328b7ce6c', '7760dd02-bd40-4afb-a859-3ee92da2ba98'),
('d3d54cd0-cc75-4945-a21d-d565536f4e74', 'ee364418-59f6-4a5c-b61e-e19060e1944f', '4457a582-380c-4dcc-9fdd-f30a1e146ccf'),
('2a4f7f95-1e35-408a-ab36-2c8651302e07', 'd00a72c9-4c8f-44a9-9e4f-e77bd3c50827', 'cdc1980e-4a9b-436d-b5d4-72c7424866d6'),
('cb2061cd-4cf8-4f7e-97a7-ecee92aafc75', '61bf51df-ccb5-4623-b1d4-c2a71dc3b136', '45ba7c3a-107a-4bc1-8a8b-f489c561fe48'),
('c2beff83-24e8-4886-92fd-b14bcf570035', 'cbd83e9f-3d67-42b4-b9b7-2f43b116e644', '79d079a2-5bef-400f-8836-45d77dce8fd5'),
('7aa484af-1480-4fa6-93ac-0fe0cb828aa0', '3278ce81-d985-4637-988e-77d7c8b20664', 'e5e07593-be81-4a34-9ce9-92ef55a3d4d5'),
('dff9131b-93da-471c-b111-d9a038ce3749', 'ddfa649e-934c-4cf8-91c4-1e05cdc4d2f0', '1af93f6c-cc01-4c83-874c-5ae556a99877'),
('d01609dd-a33c-4de4-993f-6ee0cbaec429', 'd5bc880b-89e3-4eb8-82b6-f4e63f99edc3', 'e5e07593-be81-4a34-9ce9-92ef55a3d4d5'),
('442f08f9-c6fe-4ecb-89d4-aa641931a959', '6b5a5bab-cb6d-4c60-9071-cb95b01bf8ca', 'ede20284-ed16-476c-b416-bc4e3f975edb'),
('3fcd90e5-9577-4ddd-ac77-382b6aee93c7', '47483ce4-df10-44b3-81b8-ab924b78ab8b', 'ede20284-ed16-476c-b416-bc4e3f975edb'),
('5246d398-28d4-4b21-9547-d906658a26ab', 'f264e91e-0409-4ffd-ade4-e5a9288d6bbb', '6c02bdd5-14fd-4509-96ab-bf36f54079cb'),
('575b695a-936b-41c3-a0c3-f50f57583ee9', 'ef9b6828-f33d-4d2e-823b-7672a73bf6c4', '2fb3a9d4-a8c4-4620-9105-736d260e40ca'),
('d3f7acfd-dfd3-4c2f-b626-ba62f7a53f5a', '37175469-a552-4750-a691-1f066ed2a616', '2fb3a9d4-a8c4-4620-9105-736d260e40ca'),
('fbce61a5-07fc-4b48-9bb4-2fa773b8b0b3', 'affcd6f7-8336-4784-9dfe-4231bc1e20f6', '7778e0ac-70e6-4248-95fc-d16d41b291bb'),
('6653c683-e88e-4b83-b9bd-01306636f183', 'cc6b25c3-51f9-4ae7-87ed-800191fdcd0d', '7778e0ac-70e6-4248-95fc-d16d41b291bb'),
('9fd826bc-e0f4-423c-a4c2-44fa6fbf38e9', 'eb428426-4daa-4d37-9423-55ef0a84d874', '9ad0a3d7-f93b-4f8b-aae8-abf25b2b3704'),
('a85dacc9-20a0-4c19-921b-3b5471ff8b45', '1fc97f86-7be1-42f9-a07a-eb9f53c7e089', '6ae50507-7eb4-417f-842c-fa5fcbeb5b67'),
('8330a3be-76d0-4120-9c8b-3033e280a6ce', '9978a430-3d60-4686-9879-d8a1b0d0afb2', '71a84704-fa31-471e-b6d2-fb568936ba25');

-- Insert story_locations relationships
INSERT INTO story_locations (id, story_id, location_id, location_role) VALUES
('32e18a10-1d4b-431a-95c9-392814f99021', '7c319cc6-eeda-44c6-9dae-e3a44d685901', 'eb0c0d01-5bef-47e7-83a4-a11e8403444b', 'setting'),
('c74ff546-5e3d-4c1b-b62d-91766772c4b0', '3cffbe49-2130-4819-a35e-b96558d87f10', '04515265-ffcd-4a8d-a20e-e1498d54a1bf', 'setting'),
('c76b6dc2-d87b-48ae-8f03-387bef396887', 'f4a55f7e-58d7-4b20-a413-d413940df855', '6930aa4c-f304-40d9-bd06-c6940f78a7f3', 'setting'),
('4c353786-7639-4225-91c4-043f943b3aa4', '753a84b5-7f05-4aac-a888-e94840161dd8', '8d989653-0ffd-42a6-9da2-b66a7d58ec22', 'setting'),
('1d260178-6b01-4927-af00-62d17d4ff100', '2f5f23bc-7958-4bbf-a1a1-ca4fedb5bb5b', '6202afe3-c443-4ce6-8b50-a00ab0df3e20', 'setting'),
('daf29429-c766-4b23-a65d-ef46c027b553', '9bfb504f-f731-4001-b2c0-01217de157d1', '29c4aa59-2355-4288-8db3-5cee4458d6c4', 'setting'),
('bfb0bc8d-f662-4ebe-af19-3921699d6782', '4d6463c6-9794-4b26-80c2-cccea416b544', 'df1a2da9-e7c1-4ceb-bbd5-54427052b261', 'setting'),
('ad2b5284-3af1-4bd8-aa3e-afc52087e420', 'd67fb0ef-a09f-476d-8543-72c44545f11d', 'ee3343b9-1a77-42d9-9382-10e8b10b86c1', 'setting'),
('9db2c7bb-a4d4-47a1-b5bd-fbe0dd9d25dc', '0d82745c-b2ad-4e60-aff7-485d641a7d2d', '3b4879f0-a168-4156-a6fb-3cf208576a73', 'setting'),
('24658f49-5c4f-4e70-9549-cbd24b02a38f', '7310009c-d0e4-41a4-8aa3-86017ac3da36', '5005ac89-2350-4564-b30d-a7e3689baa37', 'setting'),
('817a0e0d-181e-4601-8ad8-053e741b7f87', '2caf1b69-d04b-48c2-a2b1-056af69d7ee4', 'cf6e2852-8852-40cb-93ba-a775833fc359', 'setting'),
('90cadea6-d5f9-4558-8bdc-132cddff7b01', '04b5f2ad-63a4-436a-8bfd-deb328b7ce6c', '186dec44-309b-49ef-8d16-a24568e9fcb2', 'setting'),
('2bf43c59-27d2-4c5d-bcc4-233e77cd88ea', 'ee364418-59f6-4a5c-b61e-e19060e1944f', '186dec44-309b-49ef-8d16-a24568e9fcb2', 'setting'),
('8dc522e1-72f1-4688-802f-e218ce5375ce', 'd00a72c9-4c8f-44a9-9e4f-e77bd3c50827', 'b3ae1439-668d-4799-b6ae-4197e68efc31', 'setting'),
('d8531456-6997-4d09-be38-e8ddb8b46c58', '61bf51df-ccb5-4623-b1d4-c2a71dc3b136', '61c0a130-3400-4eb8-901d-12febf8b57dd', 'setting'),
('f93ea1ac-bf28-4a0c-8dbe-be75f4f6fa39', 'cbd83e9f-3d67-42b4-b9b7-2f43b116e644', 'ad229170-403f-4277-8dcf-69049bc88d5b', 'setting'),
('0881107c-d840-4a77-ad56-c2dddcb4e600', '3278ce81-d985-4637-988e-77d7c8b20664', '9ff1e26b-0fbb-41ff-8d91-8d7afb579f49', 'setting'),
('df815367-2582-473f-adce-0d0960f03ed3', 'ddfa649e-934c-4cf8-91c4-1e05cdc4d2f0', '9ff1e26b-0fbb-41ff-8d91-8d7afb579f49', 'setting'),
('bf3f095f-2590-4c7c-b7a6-de12a60b6bbd', 'd5bc880b-89e3-4eb8-82b6-f4e63f99edc3', '9ff1e26b-0fbb-41ff-8d91-8d7afb579f49', 'setting'),
('ca3c6746-a793-4153-bb61-ef3812681b8c', '6b5a5bab-cb6d-4c60-9071-cb95b01bf8ca', '5d03e8be-0fea-47cc-9e2a-fdebf267692b', 'setting'),
('62a0cd83-8666-4c69-bf80-e6c8f88f85c1', '47483ce4-df10-44b3-81b8-ab924b78ab8b', '35a4aa18-bdb3-4f87-a029-ed1f0bfe9b6a', 'setting'),
('e1dd079b-1097-4045-946b-5327504e2759', 'f264e91e-0409-4ffd-ade4-e5a9288d6bbb', 'bc66d580-1023-4fd7-b5cf-a45d4dfcdd55', 'setting'),
('7fb20e9f-cc69-4d3d-a73e-3a5dd768bf42', 'ef9b6828-f33d-4d2e-823b-7672a73bf6c4', '7addc914-01b9-4488-9a53-9061ae5dfffb', 'setting'),
('240b9072-1391-4cdc-a1e4-56a0226e7fea', '37175469-a552-4750-a691-1f066ed2a616', '7addc914-01b9-4488-9a53-9061ae5dfffb', 'setting'),
('58346964-1292-458f-be18-1756034bedc7', 'affcd6f7-8336-4784-9dfe-4231bc1e20f6', '6321d5ef-c707-443f-99fb-c1ee75ef0bbb', 'setting'),
('74d864d7-8b08-4b41-9cd2-ccfffdfaef43', 'cc6b25c3-51f9-4ae7-87ed-800191fdcd0d', '56355b4d-f4f8-4ef7-92c8-8dd9f0288c7e', 'setting'),
('6fc5e4c2-5b82-4e77-aab0-7bd65f7f37c5', 'eb428426-4daa-4d37-9423-55ef0a84d874', '32cb6b83-4e1c-464e-9619-d2bf0eca1bc3', 'setting'),
('41f44700-a38b-43a6-b411-c81526cc9d04', '1fc97f86-7be1-42f9-a07a-eb9f53c7e089', 'c392a103-cfaf-40bb-88d2-55634a6d7f38', 'setting'),
('1106e38f-2eee-4594-87a1-8582f1b6511e', '9978a430-3d60-4686-9879-d8a1b0d0afb2', 'f9e6e689-38d3-4221-826a-c51a368d40a4', 'setting');

-- Insert story_themes relationships
INSERT INTO story_themes (id, story_id, theme_id) VALUES
('a3d25188-b3bf-40d7-a754-ca9f7d982120', '7c319cc6-eeda-44c6-9dae-e3a44d685901', 'f734c13c-13b9-4db7-9d0d-75bade3a1b50'),
('ea1d9bbc-7a70-466d-92a1-2b4257f8db5f', '7c319cc6-eeda-44c6-9dae-e3a44d685901', '86b77d57-fce5-40c8-a74f-eb01be967f6d'),
('f06546f6-b6b3-4832-95e3-a6dbd4faa817', '3cffbe49-2130-4819-a35e-b96558d87f10', '98d4e76d-f362-42dd-8ca8-607632669306'),
('e91e931c-7dfc-4467-8cb5-4f6348ed26cd', '3cffbe49-2130-4819-a35e-b96558d87f10', '86b77d57-fce5-40c8-a74f-eb01be967f6d'),
('810f42a9-458b-4d7a-95cd-cad8d5082b41', 'f4a55f7e-58d7-4b20-a413-d413940df855', '0e530f86-31b7-4ab0-bba7-c5eebc03028c'),
('7ad8f3a5-4ae7-4086-9340-6e74babbb93c', 'f4a55f7e-58d7-4b20-a413-d413940df855', 'f734c13c-13b9-4db7-9d0d-75bade3a1b50'),
('4c78a6ae-fe99-40d3-80fb-0a02beb6f303', '753a84b5-7f05-4aac-a888-e94840161dd8', '63a342f8-de76-45c9-8bc6-566d4f7eee16'),
('651f5acc-599c-47b1-801d-d892eadf1575', '753a84b5-7f05-4aac-a888-e94840161dd8', '5162959c-12a2-4ee9-bd0c-29a88864a0f6'),
('c4023e7e-07e4-4ffd-b97a-d592299131da', '753a84b5-7f05-4aac-a888-e94840161dd8', '632b4d4a-9662-4e28-bfdf-ddbc676b1d37'),
('d6d980c3-8e17-407e-8207-ab8ff4b8b5ab', '753a84b5-7f05-4aac-a888-e94840161dd8', 'e570d58e-e410-4c7b-9e84-8c6900e0b23f'),
('1754d16d-a097-4c5a-842a-c3643560c18d', '753a84b5-7f05-4aac-a888-e94840161dd8', '6fcb795a-2be7-4378-8ad9-0f85d20f2d1c'),
('193406f7-55a6-4a68-9069-686e215a24c1', '2f5f23bc-7958-4bbf-a1a1-ca4fedb5bb5b', '6206724d-2a48-4b30-ad1e-bf2a87106125'),
('25fb6f49-0226-4dae-a675-0ca3580777de', '2f5f23bc-7958-4bbf-a1a1-ca4fedb5bb5b', 'ee874d1a-aa98-40ca-8a16-69c9efc52fba'),
('d0fcbc9f-9690-41fe-a9fc-558d0b5085e9', '2f5f23bc-7958-4bbf-a1a1-ca4fedb5bb5b', '18b16804-b93c-44ac-ae2c-d841af68bfa0'),
('4abf9ba5-38c6-429f-b63d-49166412d8c1', '2f5f23bc-7958-4bbf-a1a1-ca4fedb5bb5b', '59f8af83-2601-4cf8-8589-83285ecce332'),
('2291fd35-7ecc-430d-90c8-2f46f045b904', '2f5f23bc-7958-4bbf-a1a1-ca4fedb5bb5b', '46d1bdcb-7c5b-4d0d-b83d-7c2e3b48e9de'),
('716d9a5b-e8e2-4a31-ab29-bbddbe10ed68', '9bfb504f-f731-4001-b2c0-01217de157d1', 'fc502603-353e-4720-acb2-430018f7f8f7'),
('f611671e-aee6-4245-83df-60e7cad312d8', '9bfb504f-f731-4001-b2c0-01217de157d1', '1dcbae87-f67d-4146-a999-c79b1efcb5a3'),
('22fdf777-6369-4f96-836b-f0d1d6c1a163', '9bfb504f-f731-4001-b2c0-01217de157d1', 'af5dd33f-e71b-4e1b-8cda-758dedded510'),
('36c1f2df-fd39-4a9e-a6ef-e0b6611459ef', '9bfb504f-f731-4001-b2c0-01217de157d1', '98d4e76d-f362-42dd-8ca8-607632669306'),
('2f80cdc1-d703-440a-aa07-8e2bc8f6a54b', '9bfb504f-f731-4001-b2c0-01217de157d1', 'b79639dd-fe54-4ecb-b70e-7bb9ea6df771'),
('3eb79d31-db9d-4c4e-9248-6e3609bbafdd', '4d6463c6-9794-4b26-80c2-cccea416b544', 'ebb7b2bf-a51a-4d1e-a9d4-51dae5c51bf6'),
('99666b17-3dbb-4566-af50-64ef035a7b03', '4d6463c6-9794-4b26-80c2-cccea416b544', '6f06af9d-ae6a-4c3d-833e-fe26d6f4793b'),
('cc408c99-3ac0-498a-b948-511f086a2e05', '4d6463c6-9794-4b26-80c2-cccea416b544', '89e56645-5a8e-4165-b30c-7e2c8b866515'),
('f00107ae-ea2d-4edd-9b7a-49e69f0e6162', '4d6463c6-9794-4b26-80c2-cccea416b544', '04f80cb0-cd5a-4160-a595-9d250870ac21'),
('bc7b147b-5699-4f59-85d8-77e58fabeca6', 'd67fb0ef-a09f-476d-8543-72c44545f11d', '643796cf-df0a-4c25-901a-71fa868a54b9'),
('1208472c-9a66-4778-a224-1826c91fba14', 'd67fb0ef-a09f-476d-8543-72c44545f11d', '2a9a09be-b489-423d-a83d-4b19dd57c9c8'),
('2b7a536e-d6f4-437a-b732-fac5b32231e6', 'd67fb0ef-a09f-476d-8543-72c44545f11d', 'b1df8938-0ff5-4613-92de-0def7ac002ae'),
('dd6bd991-9d98-4021-b186-139ff1a5940b', 'd67fb0ef-a09f-476d-8543-72c44545f11d', '085134e2-c289-411f-a3c9-3b617d21c475'),
('09b1b80c-042c-4cc6-812b-85fa89bf6567', 'd67fb0ef-a09f-476d-8543-72c44545f11d', '4880b79b-56d3-4335-acd5-75485e05c9c1'),
('e4898f59-37dc-4267-9c96-9bb900c523bb', '0d82745c-b2ad-4e60-aff7-485d641a7d2d', '8bf3fcfa-21ee-4022-a5b8-5e1da2f667dd'),
('d48d6267-1172-497c-93a2-23bc26838c41', '0d82745c-b2ad-4e60-aff7-485d641a7d2d', '8453ffa4-a18c-465c-b486-cebb95664f47'),
('380356e9-214a-4b78-a359-516e5c297b12', '0d82745c-b2ad-4e60-aff7-485d641a7d2d', '48ec9fe9-cefa-44d8-a353-1069122b465c'),
('48be8667-dcd8-4d81-83b6-99f23c29a491', '0d82745c-b2ad-4e60-aff7-485d641a7d2d', 'c42a0ff6-a328-4953-8afe-27102ae46cad'),
('4d8389b6-06d5-4a50-b00b-9f31f2b8332d', '0d82745c-b2ad-4e60-aff7-485d641a7d2d', '5b461e9a-5d1b-432a-922d-de2a3312de86'),
('f4219148-6fb1-4fc3-8698-29ba4585eee9', '7310009c-d0e4-41a4-8aa3-86017ac3da36', 'dba31259-3985-485f-b4a5-ba84ebbcf2d9'),
('e562ee23-e8d2-4274-a0bc-17067acef8c2', '7310009c-d0e4-41a4-8aa3-86017ac3da36', '80f022ef-2d55-487b-a2de-3143c454eb3c'),
('d8aaa37a-d817-4674-88cf-29f8e70fea8f', '7310009c-d0e4-41a4-8aa3-86017ac3da36', '48ec9fe9-cefa-44d8-a353-1069122b465c'),
('f88f8285-3bc5-4f31-9b85-0c855e91edc3', '7310009c-d0e4-41a4-8aa3-86017ac3da36', '6ca75dcc-82b2-4fcc-ad97-772e459535ee'),
('f4bacd34-de21-476d-888c-311665027134', '2caf1b69-d04b-48c2-a2b1-056af69d7ee4', '85476eb8-936f-4ff2-98b4-ff4903d3ad18'),
('1d57f3c9-27d4-4c5b-b5ae-ea2d9211c2d0', '2caf1b69-d04b-48c2-a2b1-056af69d7ee4', '073ab194-8da2-4afd-a92d-69712865cb2e'),
('394bdbec-d96b-4026-8fb5-914009b646bf', '2caf1b69-d04b-48c2-a2b1-056af69d7ee4', '80f022ef-2d55-487b-a2de-3143c454eb3c'),
('808e4fc1-0749-4ab0-bdd4-8a907a4f9464', '2caf1b69-d04b-48c2-a2b1-056af69d7ee4', '5fa0de15-4fbf-4878-b43f-e5cdfdb24a71'),
('ed56a682-4d4e-4fe9-8877-6a55826a26fe', '04b5f2ad-63a4-436a-8bfd-deb328b7ce6c', '76b54d28-85cc-4bab-9117-58e8f2879e92'),
('901a8688-135a-475e-b0e7-d406b096e82c', '04b5f2ad-63a4-436a-8bfd-deb328b7ce6c', '60ec8c7d-d345-47a2-a150-cad36fb88e70'),
('fc8a193a-629d-4d92-ab8e-be6048d8d65f', '04b5f2ad-63a4-436a-8bfd-deb328b7ce6c', 'b84260a9-5ff5-45db-892a-cdea548da4b4'),
('56a6656f-1fb5-4704-bca0-b6f182d9aa11', '04b5f2ad-63a4-436a-8bfd-deb328b7ce6c', '25d0030e-34fc-4e59-b537-d00e30ce873c'),
('3ef262d3-0a80-40c1-8f93-8a94faab22bc', '04b5f2ad-63a4-436a-8bfd-deb328b7ce6c', 'de9e4595-ea4b-459e-88b6-f776e670ebc1'),
('2876f5be-d27b-4a74-873c-deb704820b38', 'ee364418-59f6-4a5c-b61e-e19060e1944f', 'd2a81b16-98f5-4f45-89ab-596b4ca52c66'),
('e7605a0b-ef87-4f90-b26b-0a7543906c57', 'ee364418-59f6-4a5c-b61e-e19060e1944f', 'bbab02ec-e289-4aef-8e4d-f797be4765d0'),
('3a0c56e6-5f20-4e1a-bb6d-f4f78e096e49', 'ee364418-59f6-4a5c-b61e-e19060e1944f', 'ab10b144-5e11-470a-956a-a239c547bc74'),
('eaaef29a-6e30-4956-b939-9681aad7d8db', 'ee364418-59f6-4a5c-b61e-e19060e1944f', '1b760a92-8a19-4a85-a479-afa1368bde09'),
('667242e6-d31d-4c4e-8572-90ce0dc21358', 'd00a72c9-4c8f-44a9-9e4f-e77bd3c50827', '99c63ffa-133e-4c49-93f0-51558a127789'),
('cf177a71-b1bc-4653-b47c-e46f0c694c27', 'd00a72c9-4c8f-44a9-9e4f-e77bd3c50827', 'ed576e4e-f63f-4c72-85f5-240c44ac7460'),
('a6af7e16-42f2-4463-97fd-df3522fd079a', 'd00a72c9-4c8f-44a9-9e4f-e77bd3c50827', 'ce2ebd58-0f20-4fee-a337-f58c58eb988c'),
('f782c0e1-cc9b-4650-adc1-4216888dd146', 'd00a72c9-4c8f-44a9-9e4f-e77bd3c50827', '6affff6d-3d56-446e-9547-9b8142df2583'),
('a66bce78-a547-41e2-b7e0-3d94758443d1', '61bf51df-ccb5-4623-b1d4-c2a71dc3b136', 'ccfbc65c-8600-45fc-bd9a-39c2210a09b4'),
('1220d727-236b-412c-aa6d-3c17beeaac29', '61bf51df-ccb5-4623-b1d4-c2a71dc3b136', '76b54d28-85cc-4bab-9117-58e8f2879e92'),
('f543e78c-119d-4f22-b3e3-0f65bf4a50d6', '61bf51df-ccb5-4623-b1d4-c2a71dc3b136', '21e5f677-fc65-4772-95b0-650a3d711258'),
('a7e637c5-c99b-4300-a27f-1f6151a0de3b', '61bf51df-ccb5-4623-b1d4-c2a71dc3b136', '611a19bd-d856-4f33-a665-9e056334d541'),
('e9b4b22b-d651-41d0-b54a-5fed9f3bd739', 'cbd83e9f-3d67-42b4-b9b7-2f43b116e644', '6206724d-2a48-4b30-ad1e-bf2a87106125'),
('92624142-294c-4d67-9cf7-570cd95d88c3', 'cbd83e9f-3d67-42b4-b9b7-2f43b116e644', '30c2ed42-6acf-435e-b960-b01058b2d130'),
('ab3b31a6-986c-4282-9a55-b45b07c8d283', 'cbd83e9f-3d67-42b4-b9b7-2f43b116e644', 'd8a38014-e3e0-44e1-95d2-6500211be9e4'),
('f5c79ba3-4df4-455d-8e56-771720829764', 'cbd83e9f-3d67-42b4-b9b7-2f43b116e644', '120d62e3-0796-454a-b693-8bf2997d5702'),
('c4db55e7-e434-4fd6-968b-e203cc56d76d', 'cbd83e9f-3d67-42b4-b9b7-2f43b116e644', '1c1110cd-4538-4ac5-b610-66b25b3cef46'),
('d9613721-dd34-473f-b79c-86c972acc6c8', '3278ce81-d985-4637-988e-77d7c8b20664', 'd2a81b16-98f5-4f45-89ab-596b4ca52c66'),
('4daa1b5b-b96f-4e59-a03a-ced499df8303', '3278ce81-d985-4637-988e-77d7c8b20664', 'd9532720-755d-4c54-8223-c74bc2919e63'),
('e323a4a2-628e-4f52-bdd5-383dc2bca7cc', '3278ce81-d985-4637-988e-77d7c8b20664', 'e2016842-3e5d-4f06-8fea-969c5027527f'),
('cf537394-74fb-43a3-81c6-a07a55472483', '3278ce81-d985-4637-988e-77d7c8b20664', 'cadd571f-e0b1-45af-a358-5b172b9b8d1c'),
('594b91d4-6375-4fb9-afc3-70209a22239d', 'ddfa649e-934c-4cf8-91c4-1e05cdc4d2f0', '233ba569-219b-4e4c-9f34-30220065c5bf'),
('3ffb17fd-4db8-4f9a-ada9-f6f5256670bc', 'ddfa649e-934c-4cf8-91c4-1e05cdc4d2f0', '60ec8c7d-d345-47a2-a150-cad36fb88e70'),
('66d584c5-49a9-4a81-9706-9d016adb904d', 'ddfa649e-934c-4cf8-91c4-1e05cdc4d2f0', 'de9e4595-ea4b-459e-88b6-f776e670ebc1'),
('a6cb9d6f-eff7-40fb-94c2-587ee9f2d4fe', 'ddfa649e-934c-4cf8-91c4-1e05cdc4d2f0', '32f804c2-4ca4-45c8-b1cd-0b47c421cbaf'),
('04cc4cad-0b63-4d9a-8f5b-3ca431a4da1f', 'ddfa649e-934c-4cf8-91c4-1e05cdc4d2f0', '76b54d28-85cc-4bab-9117-58e8f2879e92'),
('df7e9938-ba03-4998-a864-2d37fba920fd', 'd5bc880b-89e3-4eb8-82b6-f4e63f99edc3', '59f8af83-2601-4cf8-8589-83285ecce332'),
('fda4feb7-a551-4e3f-ac3e-32d920f39147', 'd5bc880b-89e3-4eb8-82b6-f4e63f99edc3', 'cadd571f-e0b1-45af-a358-5b172b9b8d1c'),
('ce779e77-fa2e-49a8-8a5e-20f149315631', 'd5bc880b-89e3-4eb8-82b6-f4e63f99edc3', '21a4b691-1b19-4d45-80e3-1b85a669f7a3'),
('005487d6-ce10-4b1a-a40b-a592f20eb87a', 'd5bc880b-89e3-4eb8-82b6-f4e63f99edc3', '701bebaf-723c-49a0-aa14-f2bf124c7f17'),
('e8bcc57f-3332-44f5-9ef6-36129f642e59', 'd5bc880b-89e3-4eb8-82b6-f4e63f99edc3', '203fcdbd-35a2-43c2-a12d-c957137386e5'),
('7625990c-72c0-4c57-ac5f-9eec072f3d0c', '6b5a5bab-cb6d-4c60-9071-cb95b01bf8ca', 'fae1320f-4526-4ef9-825f-e39feb2cdebd'),
('41729239-b418-43a8-a669-c43adaa97221', '6b5a5bab-cb6d-4c60-9071-cb95b01bf8ca', '99c63ffa-133e-4c49-93f0-51558a127789'),
('6762cfa7-8930-47bb-bef4-6e37807de8f1', '6b5a5bab-cb6d-4c60-9071-cb95b01bf8ca', '95825f23-6d9f-4b47-9472-20fd33df94e6'),
('9743f6ca-da53-4e8e-8db7-3e4b8277a6dc', '6b5a5bab-cb6d-4c60-9071-cb95b01bf8ca', '701bebaf-723c-49a0-aa14-f2bf124c7f17'),
('87e5aa76-58c0-421f-b696-fb3a03a816f2', '6b5a5bab-cb6d-4c60-9071-cb95b01bf8ca', '18b16804-b93c-44ac-ae2c-d841af68bfa0'),
('7ae36737-5608-405d-8371-c0126f7cd9e4', '47483ce4-df10-44b3-81b8-ab924b78ab8b', '79e8e3dc-fc2f-4389-a1f6-2c5ee5188138'),
('aa349125-b608-40b9-8faf-f566afff039e', '47483ce4-df10-44b3-81b8-ab924b78ab8b', 'ee874d1a-aa98-40ca-8a16-69c9efc52fba'),
('f4cf3e5f-2598-4b9c-84ea-c259c5052a3a', '47483ce4-df10-44b3-81b8-ab924b78ab8b', 'e66be18c-b755-4cf6-9a1d-63cec8924e49'),
('48440a47-2af3-4e5e-aec2-8a522d404e87', '47483ce4-df10-44b3-81b8-ab924b78ab8b', '2e83d874-9a65-4e94-890d-8e9ccad93815'),
('df1e06d3-6d0f-4a13-a5a8-5dcde6f9adca', '47483ce4-df10-44b3-81b8-ab924b78ab8b', '255246df-d5cb-4a98-b1c2-1ea87b69072d'),
('bf9b98dd-9c20-43c9-a9bb-5e98280168b7', 'f264e91e-0409-4ffd-ade4-e5a9288d6bbb', '2e83d874-9a65-4e94-890d-8e9ccad93815'),
('c3b58fc2-94bd-4a91-b0df-1b91635fdb30', 'f264e91e-0409-4ffd-ade4-e5a9288d6bbb', '43f1563f-132b-4256-bfea-695345208b60'),
('253c5822-6e66-462f-88cf-f5ad03505ad5', 'f264e91e-0409-4ffd-ade4-e5a9288d6bbb', 'd2a81b16-98f5-4f45-89ab-596b4ca52c66'),
('e253b215-bef3-4a03-948c-c4bb2c739499', 'f264e91e-0409-4ffd-ade4-e5a9288d6bbb', '535e1575-3100-4329-bba0-3cc5258051b0'),
('312b7347-2a57-4a73-bf83-e32aa2907f5c', 'f264e91e-0409-4ffd-ade4-e5a9288d6bbb', '26bca31c-af78-4424-8777-24ad1567de64'),
('4e188651-5860-4566-a660-f724189ef19d', 'ef9b6828-f33d-4d2e-823b-7672a73bf6c4', '199b1b23-d27b-4c07-a140-992a0c053b2c'),
('3fdd251b-7a68-45ef-bed3-139453e8abc6', 'ef9b6828-f33d-4d2e-823b-7672a73bf6c4', '611a19bd-d856-4f33-a665-9e056334d541'),
('8a238cf8-6278-4664-9cef-076996fcf244', 'ef9b6828-f33d-4d2e-823b-7672a73bf6c4', '69d56a8a-caea-480e-83fa-9c4bedbe8ede'),
('6b5698a7-40bc-4e7d-aa3c-f2a306cf2579', 'ef9b6828-f33d-4d2e-823b-7672a73bf6c4', '141b0e29-055e-48cd-9b14-7d0fc496148e'),
('ef0cb188-36b2-40b7-81ae-84dd9060cf0f', 'ef9b6828-f33d-4d2e-823b-7672a73bf6c4', '77f7192f-4a81-4e05-baab-c74332de41b4'),
('efe97e27-9826-458a-b6f1-da63b9dd0395', '37175469-a552-4750-a691-1f066ed2a616', '57487193-1381-4ef2-8cb4-9e58f166d4b1'),
('b64d26fa-d3f0-4941-a00c-641b761f6286', '37175469-a552-4750-a691-1f066ed2a616', 'd2a81b16-98f5-4f45-89ab-596b4ca52c66'),
('7b11d8b0-be31-4b65-b966-30a11167ce6e', '37175469-a552-4750-a691-1f066ed2a616', '388ae74e-ec9d-4478-82ad-1d76cf802d1a'),
('ecc8917f-7c3f-4d6b-b977-887ad7f44db8', '37175469-a552-4750-a691-1f066ed2a616', 'f261b5f8-256e-458b-8856-1e60fbb00949'),
('5027645d-af0f-4bc7-87b0-facaa57373de', '37175469-a552-4750-a691-1f066ed2a616', 'f7d97a7a-b5dc-4fc5-bc26-86c1c495c89f'),
('83d7971b-147a-4ff7-a3ea-7c33a92c4e34', 'affcd6f7-8336-4784-9dfe-4231bc1e20f6', '9d4f9f07-bef0-413b-ae6c-7113bdfd362b'),
('d972531f-0494-4871-a2f8-4b1c19ade199', 'affcd6f7-8336-4784-9dfe-4231bc1e20f6', 'a9073e54-86d6-4c6b-8980-035a11aa943b'),
('e9af9901-8aa3-4a1b-b67b-5451d1608d5f', 'affcd6f7-8336-4784-9dfe-4231bc1e20f6', '3279e7f5-3023-4ce3-94bc-3e30656213b5'),
('a7ce593d-b3e3-4edd-a846-4323a8a964aa', 'affcd6f7-8336-4784-9dfe-4231bc1e20f6', '99c63ffa-133e-4c49-93f0-51558a127789'),
('b9a51559-1e66-40d3-a40a-706ed8ceca3d', 'affcd6f7-8336-4784-9dfe-4231bc1e20f6', '3d862f4f-4381-43ff-9994-5ee20cd0da4d'),
('ada39509-9ada-4c0c-b612-7b9f97c87f75', 'cc6b25c3-51f9-4ae7-87ed-800191fdcd0d', 'bb27b383-1776-43ed-938c-d0b2430db1f2'),
('a1d8639c-c670-45ae-856b-ad9beb894d6c', 'cc6b25c3-51f9-4ae7-87ed-800191fdcd0d', '80f022ef-2d55-487b-a2de-3143c454eb3c'),
('28a1acc5-3755-47bf-9bf9-2224dee5354c', 'cc6b25c3-51f9-4ae7-87ed-800191fdcd0d', '3279e7f5-3023-4ce3-94bc-3e30656213b5'),
('d5899079-122f-4194-8fec-be102cbcca39', 'cc6b25c3-51f9-4ae7-87ed-800191fdcd0d', '66b97d5e-ca99-4765-bd75-71b2fa040a31'),
('713bb6c5-d14c-4814-823c-c500b4206abd', 'eb428426-4daa-4d37-9423-55ef0a84d874', '1494ee97-2bb8-4f1f-b093-67346fc0046a'),
('46293fd4-1e9b-4a33-8e10-97e033480cd4', 'eb428426-4daa-4d37-9423-55ef0a84d874', '821f51ba-36d7-46ad-8526-c120b4c94be6'),
('3b76595b-0214-469e-bf6f-02ee2b0d21bd', 'eb428426-4daa-4d37-9423-55ef0a84d874', 'f23902ca-7960-470e-8d2a-2c70ff7dd2e1'),
('9ef95fb7-76f7-4e5f-95c3-f2f7fc37d6e9', 'eb428426-4daa-4d37-9423-55ef0a84d874', '48d08f18-b977-43ce-a8b9-3b27d1663318'),
('76edea53-e83e-450a-854d-5905e473fea2', '1fc97f86-7be1-42f9-a07a-eb9f53c7e089', '2f861ff9-7d96-43f7-9b48-c2b784736012'),
('768f3b36-cc75-4938-99da-fd347f383a71', '1fc97f86-7be1-42f9-a07a-eb9f53c7e089', '76b54d28-85cc-4bab-9117-58e8f2879e92'),
('34006e7c-b272-4f66-aefe-6358331db6c5', '1fc97f86-7be1-42f9-a07a-eb9f53c7e089', '815549ea-f6c1-45f6-8f6f-212139315cbe'),
('fa13e1d4-f302-47e9-a3a4-4201eeebecce', '1fc97f86-7be1-42f9-a07a-eb9f53c7e089', '575cfd36-e9f0-473b-820a-b4d23dfbfbe3'),
('64db7c64-5348-492c-989f-880e15b46328', '1fc97f86-7be1-42f9-a07a-eb9f53c7e089', 'de9e4595-ea4b-459e-88b6-f776e670ebc1'),
('bb4569a6-183e-4904-ae60-894606fd88fa', '9978a430-3d60-4686-9879-d8a1b0d0afb2', 'a2edc8bf-5175-4ad7-8f00-d287a9983a77'),
('486ed29c-2a3d-4a8f-a0c7-decc5689c4ae', '9978a430-3d60-4686-9879-d8a1b0d0afb2', '06c84695-d756-454c-8f4e-20a0dea8bab5'),
('d357b311-c35e-4927-998b-f4a5e8cef35e', '9978a430-3d60-4686-9879-d8a1b0d0afb2', '5efdd528-f37c-45dc-993f-8423ba2457ed'),
('c993c5aa-31e7-4f95-8285-0cd13ff5337c', '9978a430-3d60-4686-9879-d8a1b0d0afb2', 'e5ff9939-4efc-44e3-8793-2b6984ceb525');

-- Insert cultural_contexts
INSERT INTO cultural_contexts (id, story_id, context_text, language_code) VALUES
('54a1f4fe-f9a4-428f-b9fa-55cfb412b042', '7c319cc6-eeda-44c6-9dae-e3a44d685901', 'In Sherpa culture, mountains are not merely geological formations but sacred entities with their own spirits and guardians. Mount Everest, known locally as Chomolungma, is considered the ''Mother Goddess of the World.''\n\nBefore climbing expeditions, Sherpas traditionally perform puja ceremonies to ask permission from the mountain deities. These rituals involve offerings of food, incense, and prayers to ensure safe passage.\n\nThe concept of sacred valleys hidden within the Himalayas appears in many Sherpa legends. These places are often described as beyul—hidden valleys blessed by Guru Rinpoche that serve as sanctuaries during troubled times.\n\nThe story reflects the tension between traditional Sherpa spiritual beliefs and the modern Western approach to mountains as challenges to be conquered. It also touches on the ethical questions surrounding the commercialization of sacred spaces and the environmental impact of climbing tourism in the Himalayas.', 'en'),
('0b5ae69a-ddfa-4e56-8896-b90179f5883b', '3cffbe49-2130-4819-a35e-b96558d87f10', 'The Boto Encantado (Enchanted Dolphin) is one of the most famous legends of the Amazon River Basin. According to folklore, the pink river dolphin (Boto) can transform into a handsome young man who seduces young women at village festivals and celebrations.\n\nIn traditional stories, the Boto always wears a hat to conceal the blowhole on top of his head, which he cannot fully transform. He is said to be an enchanting dancer and impossible to resist when he sets his sights on someone.\n\nThe floating villages of the Amazon are real communities where houses, schools, and shops are built on floating platforms that rise and fall with the river''s seasonal floods. These communities have developed a unique relationship with the river, which serves as their road, food source, and the center of their cultural identity.\n\nThe River Festival described in the story is similar to real celebrations like the Festival of Boto, where the pink dolphin is celebrated as a symbol of the Amazon''s magic and mystery. These festivals often coincide with the flood season, when the river is at its highest point.', 'en'),
('2cdc45d1-2c68-4c1d-b7b5-dfb07951b046', 'f4a55f7e-58d7-4b20-a413-d413940df855', 'This story draws on several elements of Japanese urban folklore and cultural concepts. The idea of hidden layers or dimensions within familiar spaces is common in Japanese folklore, where the boundary between the mundane world and supernatural realms is often portrayed as permeable.\n\nThe story references Edo, the former name of Tokyo before it became Japan''s capital in 1868. Edo was known for its extensive canal system and garden landscapes, much of which was transformed during Tokyo''s rapid modernization.\n\nThe concept of ma (間) – the meaningful space or interval between things – is subtly present in the story. In Japanese aesthetics, ma refers not just to physical space but to the pause or emptiness that gives form to the whole. The \"dream Tokyo\" exists in the ma between midnight and dawn.\n\nThe story also touches on the Japanese concept of honne and tatemae – the contrast between one''s true feelings (honne) and the face one presents to the world (tatemae). Kenji''s discovery of dream Tokyo represents his reconnection with his authentic self beneath the salaryman exterior.\n\nThe elderly man in the indigo jacket represents the wisdom of tradition, while the floating lanterns and impossible tea are elements of the fantastical that often appear in Japanese folklore when boundaries between worlds thin.', 'en'),
('337b702f-7b01-4870-a09c-cfb6c302f096', '753a84b5-7f05-4aac-a888-e94840161dd8', 'Written during a time of growing interest in psychology and the human mind. Poe pioneered psychological horror and explored the darker aspects of human consciousness.', 'en'),
('c742a42d-61f4-4348-83dc-a07528e10212', '2f5f23bc-7958-4bbf-a1a1-ca4fedb5bb5b', 'Written during the Gilded Age when economic inequality was stark. The story celebrates the value of emotional wealth over material possessions.', 'en'),
('caef28a8-86de-49ac-95e9-27da73fb7b9c', '9bfb504f-f731-4001-b2c0-01217de157d1', 'Written when America was establishing its cultural identity separate from Europe. Irving incorporated Dutch-American folklore to create distinctly American literature.', 'en'),
('6146e89b-b801-4a9e-964f-263593d33a86', '4d6463c6-9794-4b26-80c2-cccea416b544', 'Written during a period when America was rapidly changing and establishing its national identity. The story explores the tension between colonial past and republican future.', 'en'),
('635a7e96-b74d-4249-bf61-6a44a00e99f7', 'd67fb0ef-a09f-476d-8543-72c44545f11d', 'Written as a critique of the \"rest cure\" prescribed to women with \"nervous disorders.\" Gilman herself was prescribed this treatment and wrote the story to highlight its harmful effects.', 'en'),
('d85e06d0-54d9-4344-bbb5-fe3f12462d41', '0d82745c-b2ad-4e60-aff7-485d641a7d2d', 'Written during a time of rapid scientific advancement and growing faith in human ability to control nature. Hawthorne questions this hubris and explores the dangers of pursuing perfection.', 'en'),
('9c172c40-6911-44c6-a5e9-24c6678426f2', '7310009c-d0e4-41a4-8aa3-86017ac3da36', 'Written during a time of frontier exploration and the myth of man''s dominion over nature. London, who had firsthand experience in the Klondike, portrays nature as indifferent to human concerns.', 'en'),
('f84de160-06be-4c60-be1a-cbb7db77a98a', '2caf1b69-d04b-48c2-a2b1-056af69d7ee4', 'Written in the aftermath of World War I, which raised questions about human savagery and the thin veneer of civilization. Also reflects colonial-era attitudes about \"civilized\" vs. \"primitive\" behavior.', 'en'),
('f3fc12db-43cd-40a9-aa9d-54ac61698652', '04b5f2ad-63a4-436a-8bfd-deb328b7ce6c', 'Written during a time of British colonial expansion and fascination with \"exotic\" artifacts from other cultures. Also reflects Victorian/Edwardian interest in the supernatural and cautionary tales.', 'en'),
('95ba1800-ace4-4bf7-bee3-78e2e072ee3c', 'ee364418-59f6-4a5c-b61e-e19060e1944f', 'Written during a period of rapid scientific advancement and growing concerns about the ethical implications of new technologies. Wells explores the dark potential of scientific progress.', 'en'),
('69d8b7c7-8ab6-4303-987f-0481a29d5179', 'd00a72c9-4c8f-44a9-9e4f-e77bd3c50827', 'Written during the twilight of Edwardian England, the story satirizes upper-class country house culture and social conventions.', 'en'),
('7b2a1c81-5e8a-400c-8a71-47733eb3fe5c', '61bf51df-ccb5-4623-b1d4-c2a71dc3b136', 'Written during the rapid expansion of railways in Britain, which brought both progress and new dangers. Dickens himself had survived a serious train accident in 1865, which may have influenced this story.', 'en'),
('c54b4c81-6ad9-483b-b39f-e3a982128d43', 'cbd83e9f-3d67-42b4-b9b7-2f43b116e644', 'Written during a period of social transition in Russia, the story explores the constraints of conventional marriage and the search for authentic connection in a society bound by rigid expectations.', 'en'),
('a92e386a-e6f7-43e7-9890-8d5e1df1708e', '3278ce81-d985-4637-988e-77d7c8b20664', 'Written as a satire of Russian bureaucracy and social climbing during the reign of Nicholas I, when rank and status were obsessively important.', 'en'),
('a942b534-0445-491f-a2fb-1116497b1831', 'ddfa649e-934c-4cf8-91c4-1e05cdc4d2f0', 'Written during a time when gambling was a popular pastime among Russian aristocracy and military officers. The story explores themes of risk, chance, and the human desire to control fate.', 'en'),
('6d6701d0-3d5f-48c1-a825-daa1e63bb071', 'd5bc880b-89e3-4eb8-82b6-f4e63f99edc3', 'Written as a critique of the dehumanizing Russian bureaucracy and class system, where a person''s worth was determined by their rank and appearance.', 'en'),
('6de91b91-7e43-4890-924b-03ef31ed0c39', '6b5a5bab-cb6d-4c60-9071-cb95b01bf8ca', 'Written during the Belle Époque period in France, when class distinctions were rigid and social climbing was a common aspiration.', 'en'),
('e5f62133-b27a-4e40-861d-3ba5dcbe6636', '47483ce4-df10-44b3-81b8-ab924b78ab8b', 'Written in the aftermath of France''s humiliating defeat in the Franco-Prussian War, the story critiques French society''s moral bankruptcy and hypocrisy.', 'en'),
('4fa9822b-dde6-4cbe-bacd-24d913a793b9', 'f264e91e-0409-4ffd-ade4-e5a9288d6bbb', 'Written shortly after France''s loss of Alsace-Lorraine to Germany, the story reflects the trauma of this territorial and cultural loss to the French national identity.', 'en'),
('9ecabb0d-551c-4520-8b83-bc778e816678', 'ef9b6828-f33d-4d2e-823b-7672a73bf6c4', 'Written as traditional entertainment forms were being replaced by new media and as artistic movements were rapidly evolving. Reflects anxieties about the artist''s place in modern society.', 'en'),
('fe754ba2-7af7-441d-a5dd-1d13fce2beee', '37175469-a552-4750-a691-1f066ed2a616', 'Written on the eve of World War I, during a period of rapid industrialization and social change that was transforming traditional family structures and work relationships.', 'en'),
('72d193ff-da6c-464b-bc75-4cb0aad9bf5c', 'affcd6f7-8336-4784-9dfe-4231bc1e20f6', 'Written during Japan''s rapid modernization in the early 20th century, the story questions objective truth and traditional values during a time of cultural transformation.', 'en'),
('389c97a8-96ab-46d1-9afe-3876f0d9e9fc', 'cc6b25c3-51f9-4ae7-87ed-800191fdcd0d', 'Written as Japan was transitioning from a feudal society to a modern nation, the story explores the breakdown of moral codes during times of crisis.', 'en'),
('d86c2bbd-765f-470e-ae8a-cb872d846536', 'eb428426-4daa-4d37-9423-55ef0a84d874', 'Written during China''s tumultuous transition from imperial rule to republic, the story critiques the Chinese national character and the failure of the 1911 Revolution to bring meaningful change to ordinary people.', 'en'),
('4d575aa2-6753-4e35-a775-b3e9422dc797', '1fc97f86-7be1-42f9-a07a-eb9f53c7e089', 'Compiled during the Islamic Golden Age, these tales reflect the cosmopolitan nature of the medieval Islamic world, incorporating elements from Persian, Arabic, Indian, Egyptian, and Mesopotamian cultures.', 'en'),
('de2e1a0b-99d0-47fd-a478-32842445537d', '9978a430-3d60-4686-9879-d8a1b0d0afb2', 'Part of the rich tradition of African explanatory tales that use anthropomorphism to explain natural phenomena and teach social values.', 'en');

-- Insert images
INSERT INTO images (id, story_id, image_url, image_type, alt_text, attribution) VALUES
('84859098-18b8-487e-a880-1d20a5419155', '7c319cc6-eeda-44c6-9dae-e3a44d685901', 'https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80', 'cover', 'Cover image for The Mountain''s Secret', 'Unsplash'),
('fe8652f7-32d3-44e9-acad-0b1232e88dbd', '3cffbe49-2130-4819-a35e-b96558d87f10', 'https://images.unsplash.com/photo-1598880513756-c8913260e471?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80', 'cover', 'Cover image for River Spirits', 'Unsplash'),
('eb945a49-1667-45b2-a93e-2b79ec2d2da6', 'f4a55f7e-58d7-4b20-a413-d413940df855', 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80', 'cover', 'Cover image for City of Dreams', 'Unsplash'),
('bb4789f0-6b00-4999-98a5-7d307639d497', '753a84b5-7f05-4aac-a888-e94840161dd8', 'https://images.unsplash.com/photo-1509557965875-b88c97052f43?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', 'cover', 'Cover image for The Tell-Tale Heart', 'Unsplash'),
('61a975ec-386f-4382-b1ca-be654d779ecd', '2f5f23bc-7958-4bbf-a1a1-ca4fedb5bb5b', 'https://images.unsplash.com/photo-1512909006721-3d6018887383?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', 'cover', 'Cover image for The Gift of the Magi', 'Unsplash'),
('f7984794-d517-4a5f-94e9-d600a06086ab', '9bfb504f-f731-4001-b2c0-01217de157d1', 'https://images.unsplash.com/photo-1508165821229-7be2a6934be5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', 'cover', 'Cover image for The Legend of Sleepy Hollow', 'Unsplash'),
('01a823f7-b97b-4aa9-8ea5-ffd2b1ba23d8', '4d6463c6-9794-4b26-80c2-cccea416b544', 'https://images.unsplash.com/photo-1516939884455-1445c8652f83?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', 'cover', 'Cover image for Rip Van Winkle', 'Unsplash'),
('215c4415-7307-44e9-b307-7932fd1eb5c7', 'd67fb0ef-a09f-476d-8543-72c44545f11d', 'https://images.unsplash.com/photo-1585314062604-1a357de8b000?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80', 'cover', 'Cover image for The Yellow Wallpaper', 'Unsplash'),
('829eacdf-b907-4a9d-bc75-cf509ebc3b3d', '0d82745c-b2ad-4e60-aff7-485d641a7d2d', 'https://images.unsplash.com/photo-1584278860047-22db9ff82bed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', 'cover', 'Cover image for The Birthmark', 'Unsplash'),
('b89a3ae2-d06c-4ed1-98fa-159bf78af1ca', '7310009c-d0e4-41a4-8aa3-86017ac3da36', 'https://images.unsplash.com/photo-1483982258113-b72862e6cff6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', 'cover', 'Cover image for To Build a Fire', 'Unsplash'),
('ea60691c-84b2-4ace-a5e7-1c0a55051a22', '2caf1b69-d04b-48c2-a2b1-056af69d7ee4', 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1141&q=80', 'cover', 'Cover image for The Most Dangerous Game', 'Unsplash'),
('278b72a7-9d77-42a9-a1a0-f21889fd56bd', '04b5f2ad-63a4-436a-8bfd-deb328b7ce6c', 'https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80', 'cover', 'Cover image for The Monkey''s Paw', 'Unsplash'),
('ffd5bbad-9acf-4562-a2a6-6b3e45b5d75e', 'ee364418-59f6-4a5c-b61e-e19060e1944f', 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', 'cover', 'Cover image for The Story of the Late Mr. Elvesham', 'Unsplash'),
('23846f51-6f03-479c-9412-2f6d8e4824f2', 'd00a72c9-4c8f-44a9-9e4f-e77bd3c50827', 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', 'cover', 'Cover image for The Open Window', 'Unsplash'),
('3f9d55b6-2023-403c-a33c-cf792dcb36e7', '61bf51df-ccb5-4623-b1d4-c2a71dc3b136', 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1184&q=80', 'cover', 'Cover image for The Signal-Man', 'Unsplash'),
('3b1c5d1f-34f5-48c1-b152-5a0b83ed40db', 'cbd83e9f-3d67-42b4-b9b7-2f43b116e644', 'https://images.unsplash.com/photo-1551524559-8af4e6624178?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1025&q=80', 'cover', 'Cover image for The Lady with the Dog', 'Unsplash'),
('3da0a646-e5f3-47e2-9146-50e1dfe4ce64', '3278ce81-d985-4637-988e-77d7c8b20664', 'https://images.unsplash.com/photo-1580893246395-52aead8960dc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80', 'cover', 'Cover image for The Nose', 'Unsplash'),
('87d7b4de-5f00-4c3a-bfb7-172ac6c5d179', 'ddfa649e-934c-4cf8-91c4-1e05cdc4d2f0', 'https://images.unsplash.com/photo-1541278107931-e006523892df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80', 'cover', 'Cover image for The Queen of Spades', 'Unsplash'),
('22d62687-6b55-45fa-be0d-7b2bebee2b11', 'd5bc880b-89e3-4eb8-82b6-f4e63f99edc3', 'https://images.unsplash.com/photo-1551031761-29fc9b91a596?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', 'cover', 'Cover image for The Overcoat', 'Unsplash'),
('8e995efb-0ffe-4d3c-b227-bff164296267', '6b5a5bab-cb6d-4c60-9071-cb95b01bf8ca', 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', 'cover', 'Cover image for The Necklace', 'Unsplash'),
('39a3e4bd-54a0-4993-a06c-575416fe3989', '47483ce4-df10-44b3-81b8-ab924b78ab8b', 'https://images.unsplash.com/photo-1504197832061-98356e3dcdcd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', 'cover', 'Cover image for Ball of Fat', 'Unsplash'),
('7e072d70-ba43-40e0-8f78-ae045e39faa9', 'f264e91e-0409-4ffd-ade4-e5a9288d6bbb', 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1122&q=80', 'cover', 'Cover image for The Last Lesson', 'Unsplash'),
('619cd9fe-68f9-4c7e-98f1-7f94c443b442', 'ef9b6828-f33d-4d2e-823b-7672a73bf6c4', 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80', 'cover', 'Cover image for A Hunger Artist', 'Unsplash'),
('01a209f9-2c46-4f8a-b315-918a0cf51626', '37175469-a552-4750-a691-1f066ed2a616', 'https://images.unsplash.com/photo-1634401802733-9b474eda0b92?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', 'cover', 'Cover image for The Metamorphosis', 'Unsplash'),
('51abe330-a944-4cc5-a6c9-4f4c99177f83', 'affcd6f7-8336-4784-9dfe-4231bc1e20f6', 'https://images.unsplash.com/photo-1528164344705-47542687000d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80', 'cover', 'Cover image for In a Grove', 'Unsplash'),
('3579a883-f45c-4c36-b849-0031ab819898', 'cc6b25c3-51f9-4ae7-87ed-800191fdcd0d', 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', 'cover', 'Cover image for Rashomon', 'Unsplash'),
('1f4da08f-d1fc-4a05-a524-c0466522c027', 'eb428426-4daa-4d37-9423-55ef0a84d874', 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', 'cover', 'Cover image for The True Story of Ah Q', 'Unsplash'),
('f64425ea-bb0d-4501-bb3b-88e51c8e7944', '1fc97f86-7be1-42f9-a07a-eb9f53c7e089', 'https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80', 'cover', 'Cover image for The Arabian Nights (Selected Tales)', 'Unsplash'),
('5575c403-f09f-4f4d-a933-cf731dfd133d', '9978a430-3d60-4686-9879-d8a1b0d0afb2', 'https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1194&q=80', 'cover', 'Cover image for Why the Sun and the Moon Live in the Sky', 'Unsplash');

