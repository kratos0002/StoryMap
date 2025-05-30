-- StoryMap Data Migration
-- Generated on 2025-05-30 07:07:59

-- Insert authors
INSERT INTO authors (id, name, birth_year, death_year, nationality, bio) VALUES
('851b0a14-ba3f-4712-9ea2-eec4a38cf7a2', 'Pemba Sherpa', NULL, NULL, NULL, NULL),
('702c307b-09dd-4a40-a546-0402c1ea982b', 'Isabella Santos', NULL, NULL, NULL, NULL),
('c3164007-2e6f-47e7-98b8-2a8a8c971ab2', 'Kenji Tanaka', NULL, NULL, NULL, NULL),
('a23200ff-3150-478d-91fa-0e8c1eec1077', 'Edgar Allan Poe', NULL, NULL, NULL, NULL),
('737e1a6f-8ebd-46be-b9e8-e42aa56a6df1', 'O. Henry', NULL, NULL, NULL, NULL),
('36758edc-2b23-41e9-8a63-dc4f0bf03029', 'Washington Irving', NULL, NULL, NULL, NULL),
('b4998a8a-23a6-4c77-aca9-b2205f30381b', 'Charlotte Perkins Gilman', NULL, NULL, NULL, NULL),
('64167a9e-4005-4680-b4e5-e3ef397f1854', 'Nathaniel Hawthorne', NULL, NULL, NULL, NULL),
('f865ba4b-2d8d-46f1-9198-307588e3eb9b', 'Jack London', NULL, NULL, NULL, NULL),
('74cb5541-889f-430a-b174-bc174ebb1bd2', 'Richard Connell', NULL, NULL, NULL, NULL),
('c2429747-3ec9-4037-aae7-26509a2cb28c', 'W.W. Jacobs', NULL, NULL, NULL, NULL),
('9674eb74-4367-4419-8ba6-2131e834503f', 'H.G. Wells', NULL, NULL, NULL, NULL),
('87eab8b7-caeb-4e1f-b1e7-8fd9d3248fc3', 'Saki (H.H. Munro)', NULL, NULL, NULL, NULL),
('37833f4a-f55a-448b-a4e0-33fe8f988037', 'Charles Dickens', NULL, NULL, NULL, NULL),
('992bdedf-e975-448a-8ea6-0aca06b24d15', 'Anton Chekhov', NULL, NULL, NULL, NULL),
('378e35d4-c7e0-43a6-9645-eddac94f0fde', 'Nikolai Gogol', NULL, NULL, NULL, NULL),
('dff209af-c3d3-430a-9b98-6655d6468a53', 'Alexander Pushkin', NULL, NULL, NULL, NULL),
('8d4a07e9-f480-454a-b03c-2df3f639913f', 'Guy de Maupassant', NULL, NULL, NULL, NULL),
('47cabbed-a6a0-46e5-8760-86fb3061a5ec', 'Alphonse Daudet', NULL, NULL, NULL, NULL),
('f46a2304-3110-4713-9391-fcb47ddfc2c2', 'Franz Kafka', NULL, NULL, NULL, NULL),
('9c1537d5-43aa-4bba-b47f-bdb71762131a', 'Ryūnosuke Akutagawa', NULL, NULL, NULL, NULL),
('42a43139-1af0-478c-bfac-95067815d115', 'Lu Xun', NULL, NULL, NULL, NULL),
('a5eb1dd8-33ba-41f5-bc07-8a72c372a28b', 'Various (compiled over centuries)', NULL, NULL, NULL, NULL),
('6e475168-e410-4b18-abf7-356d4d1fe195', 'Traditional (Nigerian folklore)', NULL, NULL, NULL, NULL);

-- Insert locations
INSERT INTO locations (id, name, latitude, longitude, location_type, country_code, region, description) VALUES
('b402faf1-ab07-43f5-9c65-337fef6ef354', 'Nepal', 27.9881, 86.925, 'real', 'NP', 'Asia', NULL),
('b59c3b92-8998-4e5a-bdaa-d4408d53acc4', 'Brazil', -3.4653, -62.2159, 'real', 'BR', 'South America', NULL),
('2cc0e2db-5823-4f12-ae64-6fd0bd38ed5a', 'Japan', 35.6762, 139.6503, 'real', 'JP', 'Asia', NULL),
('d99d7224-d740-473e-ab2f-cedb3878acbf', 'United States', 39.9526, -75.1652, 'real', 'US', 'North America', NULL),
('783f16c8-56e5-467f-91d0-bc0cc91d0196', 'United States', 40.7128, -74.006, 'real', 'US', 'North America', NULL),
('8f27ce3d-6c31-4144-8fff-eb86e121e42b', 'United States', 41.0854, -73.8621, 'real', 'US', 'North America', NULL),
('d6afcc99-c2fd-49ab-a35f-4d8cc47f8e72', 'United States', 42.1792, -74.0235, 'real', 'US', 'North America', NULL),
('6ada090c-23bf-4860-98ac-c4137b914f03', 'United States', 42.3601, -71.0589, 'real', 'US', 'North America', NULL),
('3e0af2de-fafb-4c48-a261-2c78f827f1d0', 'United States', 42.5195, -70.8967, 'real', 'US', 'North America', NULL),
('6621679e-93e6-47a7-b191-25cda786f512', 'Canada', 64.0582, -139.429, 'real', 'CA', 'North America', NULL),
('69bfcec1-b700-4596-88eb-8c6e66aaded3', 'Caribbean', 18.2208, -66.5901, 'real', 'XX', 'Caribbean', NULL),
('57d2e853-86f1-426b-b367-ecdf78b30abf', 'England', 51.5074, -0.1278, 'real', 'GB', 'Europe', NULL),
('2758a085-6224-4c65-9bd8-cfe1b1cda7ee', 'England', 52.531, -1.2969, 'real', 'GB', 'Europe', NULL),
('010ef677-2863-488c-b115-833568080553', 'England', 51.3758, -1.3631, 'real', 'GB', 'Europe', NULL),
('10db854a-bb0f-4206-9e7c-350311bdf660', 'Russia', 44.4958, 34.1663, 'real', 'RU', 'Eastern Europe', NULL),
('ad860993-7e04-4eba-9e78-dccedec11302', 'Russia', 59.9343, 30.3351, 'real', 'RU', 'Eastern Europe', NULL),
('9d91a5e2-dbb0-481f-99e7-d4f8636b601c', 'France', 48.8566, 2.3522, 'real', 'FR', 'Western Europe', NULL),
('02d7113e-5519-4ed1-91b8-56108308133b', 'France', 49.4431, 1.0993, 'real', 'FR', 'Western Europe', NULL),
('8dde9882-e690-4e85-8506-e36ace5e1ddf', 'France', 48.3158, 7.4412, 'real', 'FR', 'Western Europe', NULL),
('f643f836-8917-4b88-bcd6-938f6ebf0748', 'Austria-Hungary', 50.0755, 14.4378, 'real', 'AT', 'Central Europe', NULL),
('de1c9717-f6cb-40e4-a08d-e535e19bbd4e', 'Japan', 35.0116, 135.7681, 'real', 'JP', 'East Asia', NULL),
('82f8dc49-2736-4a5b-884a-a8f78d1922cf', 'Japan', 34.9937, 135.748, 'real', 'JP', 'East Asia', NULL),
('3c1118a0-5eaa-4ef5-98a8-0f5eabdc8059', 'China', 31.2304, 120.5859, 'real', 'CN', 'East Asia', NULL),
('fc72874f-757f-4fac-b6d5-5865f1a7338e', 'Middle East', 33.3152, 44.3661, 'real', 'IQ', 'Middle East', NULL),
('2af5b5e3-1e75-4d03-a239-c4a7dabc4db0', 'Nigeria', 9.082, 8.6753, 'real', 'NG', 'Africa', NULL);

-- Insert themes
INSERT INTO themes (id, name, description) VALUES
('017bb01c-68de-4c22-92d6-fe1ad65b4407', 'Longing', NULL),
('bb368dec-edb1-42b1-9e06-98014acff26b', 'Confinement', NULL),
('08d14df8-6226-4b08-8614-7f0d2bb8791e', 'Nervousness', NULL),
('4665b2f5-4725-4b99-b423-0ea004697bc3', 'Social breakdown', NULL),
('b9c9daae-f4cd-4e79-8b0f-3a545e7723b6', 'Patriarchy', NULL),
('4cd56ba4-33f9-4c97-b84e-bfde2717f1f9', 'Superstition', NULL),
('40a29ae6-e3de-4c2e-878d-42dfdbf55a06', 'Isolation', NULL),
('6319bae4-ba15-41aa-920e-6e678a492984', 'Work', NULL),
('1bfcbb27-1825-4374-ba64-eecbda0cd989', 'Paranoia', NULL),
('fe005739-5300-44c2-8028-9a3d68e7fa3f', 'Pride', NULL),
('6da376d5-7cc8-481d-b152-4a87f9f6ffa2', 'Psychological deterioration', NULL),
('d2ccee91-1b0f-411b-8a4a-04c2b9803220', 'Civilization vs. savagery', NULL),
('f2f7039b-d8a9-4402-9de6-b419b7963a5b', 'Misunderstanding', NULL),
('ff103109-d702-4def-90e3-00b85c05d6be', 'Family', NULL),
('06f2234e-91d4-43de-ba1a-456efc86b1dd', 'Industrialization', NULL),
('6fe7797c-93a0-4816-a617-248682bd094c', 'Change', NULL),
('d8061586-7ea1-4a48-82bd-a25c1b2b652d', 'Disillusionment', NULL),
('0c1d99e8-2626-45e9-83b2-8e65368ea093', 'Sacrifice', NULL),
('f563ed23-e807-46ff-ac9e-81dd35bcdd0c', 'Hypocrisy', NULL),
('e6f2aa8c-6f24-48ae-9fa8-eabe928e2a97', 'Consequences', NULL),
('c3822734-f5ff-4ab0-88b7-56b678f798b2', 'Imagination', NULL),
('8f78ca05-425b-4d8e-88dc-1e4d2960b69e', 'Perfection', NULL),
('6b50fa71-8bf8-4aab-8059-9e491984852a', 'Bureaucracy', NULL),
('6b2b900b-863c-4e40-81c2-58f7c037cd0a', 'Language', NULL),
('60e4ed85-613b-4ba8-ae24-26f0145350e7', 'Hunter vs. hunted', NULL),
('f0c5d2f3-dc50-410d-8d0c-9639bd9b1841', 'Class', NULL),
('45c2411c-74f3-473f-9b0b-88194498e6fe', 'Morality of killing', NULL),
('e445cc42-bca5-4213-a54c-38b6304a4a94', 'Murder', NULL),
('43ed0291-b8c8-4a39-8d94-223f59bf9dd5', 'National character', NULL),
('05ff0e9c-64fd-4ef0-b161-817ef21d0a58', 'Social conventions', NULL),
('66993ea0-3b39-4caf-bcf2-8dcb4d1ca0c4', 'Honor', NULL),
('375da9fb-8bd2-4dce-837d-0302d5129a12', 'Cleverness', NULL),
('ba7177cc-f599-4a22-9ac3-8f0cb5f450df', 'Escape from responsibility', NULL),
('c845e01a-c2e3-4cdf-8427-ae0c65a5afa3', 'Obsolescence', NULL),
('e7406028-3d51-49be-83e9-2c58c4682e58', 'Patriotism', NULL),
('41c9b142-3be6-46e5-91fd-391af97ceb12', 'Dehumanization', NULL),
('7c837883-0496-4d17-84af-2b3924085542', 'Grief', NULL),
('87ff8a43-6cfb-404f-ab49-e4270a979b4a', 'Class prejudice', NULL),
('5beda0e8-606d-4211-b451-0d8df812626d', 'Nature', NULL),
('7e7abb86-a0de-408c-abe7-7b72d3993e5e', 'Mental health', NULL),
('0263c4c6-ae47-48f7-941f-499ff06641bd', 'Storytelling', NULL),
('6a15a50a-186d-451e-b522-c2090fc4e274', 'Unintended consequences', NULL),
('6a744de1-c774-424e-ab64-66e3ce58bf5e', 'Obsession', NULL),
('26917ae9-1b26-4e4a-b24c-9e124d0a4db6', 'Guilt', NULL),
('594d8dd0-35c2-4705-a631-b3e740debb71', 'Love', NULL),
('ba4082a5-3a58-4eb0-81e4-b3a175246504', 'Justice', NULL),
('72c01fde-5606-4526-92b7-04663413d7de', 'Survival', NULL),
('92da3398-c385-43e3-b75a-eb8c32faee54', 'Folklore', NULL),
('619377f8-445a-48c7-9ec8-0e53e8e37574', 'Fate', NULL),
('98ac941f-c5d0-458a-8027-6156b000683f', 'Urban', NULL),
('49fef05e-99c5-4812-bf93-db6b5bf253a9', 'Man vs. nature', NULL),
('d2d9877f-4da5-4df3-93a2-986b8fb76556', 'Alienation', NULL),
('b3abff23-116e-440b-981d-5b9778449207', 'Outsiders', NULL),
('797f6d67-ad7a-495f-b404-57d4ba241fb9', 'Madness', NULL),
('0a661336-6ae6-4a9f-bf5b-84e4a6fa6ea1', 'Dignity', NULL),
('6048a5fd-9833-4d74-83e1-3550e82bb7bf', 'Materialism', NULL),
('a4176b65-862e-418e-9d06-a949fbece757', 'Revolution', NULL),
('c724046a-9874-490f-af60-a14f132fcb20', 'Beauty', NULL),
('dcbc0754-ecdf-4e71-9056-0a6c8ad9e987', 'Relationships', NULL),
('f558ca47-cb54-4992-ba44-8c6d25a2df99', 'Body swapping', NULL),
('14635c03-c2bc-4f14-b781-6e8a0aaf4f95', 'Aging', NULL),
('5fe7600e-ee5c-4b52-83bf-4a93fac44ea4', 'Moral corruption', NULL),
('db6f1b1b-61ab-4a49-97a1-5252000681e2', 'Greed', NULL),
('1dce3827-b2c6-407a-b50b-fa36389c0806', 'Education', NULL),
('d1cff137-0ade-4e6b-ae31-e5bfb3fd0329', 'Societal constraints', NULL),
('e5cf9fd7-70c1-4fa3-be9f-7beb8c940304', 'Perspective', NULL),
('836dfdbf-eea5-4694-a413-25df67f0b05e', 'Human nature', NULL),
('c677389c-304e-4b7d-8549-208be797c21e', 'Mythical', NULL),
('3400937e-4383-4eeb-92f5-6e7f387ff265', 'Absurdity', NULL),
('375cc43a-f829-4d77-a821-5d0caaf031cb', 'Ghostly revenge', NULL),
('424b4868-e0b5-40cd-af01-a07170021e55', 'Self-deception', NULL),
('3b7ba184-4e64-459b-aa37-f9bb681cb0a2', 'Supernatural warnings', NULL),
('fc56cf98-8f1d-4d8b-836b-d2b387d7001a', 'Instinct vs. intellect', NULL),
('f03810e4-86d7-4b33-b543-1545254219c4', 'Irony', NULL),
('7c369215-89e3-4fb4-b383-5cecca94de7b', 'Mortality', NULL),
('afdc77e3-6ceb-4f7d-8685-12bc9b950b78', 'Moral ambiguity', NULL),
('e8fc627f-a79f-4416-b4cd-28d168a0db11', 'Scientific ethics', NULL),
('f31b30f4-d967-4087-8c8e-ab8c3f50798f', 'Natural elements', NULL),
('b232add0-5900-4baa-add6-f37dac2ca6e5', 'Passage of time', NULL),
('cc659bd6-c485-434e-8c04-ed3abc3cf6ae', 'Hospitality', NULL),
('547554f3-2aeb-4df2-a532-2ae29284a6fc', 'Science vs. nature', NULL),
('5a7a27a6-4326-42e9-8a68-a05cf227b39b', 'Poverty', NULL),
('f9420218-9cad-473d-8df0-725b282a3edc', 'Social status', NULL),
('30aa606b-9e6a-4aa6-829b-901f5b7b55fe', 'Hubris', NULL),
('b0bc87bd-f07e-4640-9655-cdc23f62dff2', 'Supernatural', NULL),
('4a87a5ea-6aee-44df-b8f5-5183aeec9943', 'American identity', NULL),
('fcc42697-5a5e-4f65-9ea4-a3a133fab510', 'Gambling', NULL),
('f04bf71e-6e06-49e9-8183-c03552e899d3', 'Deception', NULL),
('6e0f8b66-22bc-45ba-a155-a8972b6daebe', 'Truth', NULL),
('650049dd-4b06-4bf5-b206-3787d1b52b11', 'Rural American life', NULL),
('286648a7-e45d-4c5e-8685-4e7a8df88e45', 'Women''s rights', NULL),
('adcceab8-6295-42be-aa62-697b912e031c', 'Ambition', NULL),
('79aca7bf-3d25-43bb-a0cc-89ebb4ad757a', 'Loss', NULL),
('c2a51719-d37e-4200-aa06-0221a411630a', 'Art', NULL),
('8c3f2ae6-fb69-4e93-94c0-bb022748b87b', 'Medical misunderstanding', NULL),
('fb208296-fc80-4949-8454-24964be762c8', 'Gift-giving', NULL),
('268b8984-b1c4-4225-b52c-76ff1dddf18a', 'Identity', NULL),
('a73dc175-d123-4ef1-9e90-fb21fd1ccf5f', 'Dedication', NULL),
('d7b29b49-b2c2-4f2e-9315-f1b20fc164b3', 'Infidelity', NULL),
('4b8f25ed-f855-4091-898e-a80a53c0891a', 'Social change', NULL);

-- Insert stories
INSERT INTO stories (id, title, slug, original_language, original_text, summary, reading_time_minutes, publication_year, is_public_domain, source_url) VALUES
('mountain-secret', 'The Mountain''s Secret', 'the-mountains-secret', 'en', 'The old Sherpa guide, Mingma, had climbed these mountains for over forty years, but he had never taken foreigners to the hidden valley. It was a place known only to his people, a sanctuary where the mountain spirits dwelled.\n\nBut this season had been difficult. The changing climate had made traditional routes treacherous, and the foreign climbers who hired him were growing impatient. When the American expedition leader, Dr. Harrison, showed him an old map with the valley clearly marked, Mingma felt a cold unease settle in his stomach.\n\n\"This route,\" Dr. Harrison had said, tapping the faded parchment, \"will give us a competitive advantage. No one has documented this approach to the summit.\"\n\nMingma had tried to dissuade him. \"The valley is sacred to my people. It is not a path for outsiders.\"\n\nBut Dr. Harrison had merely smiled. \"We''ll be respectful. Scientific progress requires exploration.\"\n\nAnd so, against his better judgment, Mingma led the five climbers into the valley as the morning mist still clung to the ancient rhododendron forests. The foreigners marveled at the untouched beauty, taking photographs and samples, oblivious to Mingma''s growing discomfort.\n\nBy midday, they had reached the stone circle—seven weathered monoliths arranged in a perfect circle around a flat altar stone. Dr. Harrison was ecstatic, immediately setting up equipment to document the find.\n\n\"Please,\" Mingma warned, \"we should not linger here.\"\n\nBut the scientists were too engrossed in their discovery to heed his words. As the sun began to set, casting long shadows across the valley floor, a wind rose from nowhere, carrying with it a scent of juniper and something older—something that reminded Mingma of the high caves where his ancestors were laid to rest.\n\n\"We must leave now,\" he insisted, but his words were lost in a sudden swirl of mist that enveloped the stone circle.\n\nWhen it cleared moments later, Dr. Harrison and his team were gone. Only their equipment remained, scattered across the ground as if dropped in haste.\n\nMingma was alone—or so he thought until he saw the figure standing by the central stone. It appeared to be an old man dressed in the traditional garb of a Sherpa from generations past, but his eyes reflected the ancient glaciers.\n\n\"They did not listen,\" the figure said in a dialect so old that Mingma barely understood it.\n\n\"Where are they?\" Mingma asked, his voice barely a whisper.\n\n\"They have been shown the true paths of the mountain,\" the figure replied. \"As all who disrespect these sacred grounds must be.\"\n\n\"Will they return?\"\n\nThe ancient one considered this. \"Perhaps. When they understand that the mountain does not yield its secrets to those who seek to conquer it, but only to those who come with reverence.\"\n\nMingma nodded, understanding at last why his grandfather had warned him never to guide outsiders to this place.\n\n\"And you, Mingma, son of Dorje,\" the figure continued, \"what will you tell those who sent them?\"\n\nMingma looked down at the abandoned equipment, then back at the ancient guardian. \"I will tell them that the mountain keeps its own counsel, and that some paths are not meant to be mapped.\"\n\nThe figure nodded, and then seemed to dissolve into the mist that was once again rolling through the valley.\n\nMingma gathered what he could carry and began the long journey back alone. Behind him, the stone circle stood silent, guarding secrets that would remain hidden from the world of men for a while longer.\n\nWhen search parties came looking for the missing expedition, Mingma told them of an avalanche that had swept the scientists away. It was easier than the truth. And on each subsequent season, when climbers would ask about the hidden valley route, Mingma would shake his head and say simply, \"The mountain does not wish it.\"\n\nAnd they, seeing the certainty in his eyes, would not ask again.', 'A Sherpa guide encounters an ancient guardian spirit while leading climbers through a hidden valley near Everest.', 7, NULL, true, NULL),
('river-spirits', 'River Spirits', 'river-spirits', 'en', 'The river knew secrets that the people of Porto do Céu could only guess at. It carried whispers from distant mountains, stories from other villages, and—some said—messages from the spirit world. Twelve-year-old Luiza believed these tales more than most.\n\nIt was the night of the River Festival, when the waters of the Amazon rose to their highest point, and the boundary between worlds grew thin. Colorful lanterns hung from every house in the floating village, their reflections dancing on the dark water like fallen stars.\n\nLuiza''s grandmother had warned her to stay close during the festivities. \"The Boto comes on nights like these,\" she had said, her eyes serious above her smile. \"Looking for pretty young girls to charm.\"\n\nThe Boto—the pink river dolphin that could transform into a handsome man. Luiza had heard the stories since she was small: how he would appear at festivals dressed all in white, wearing a hat to hide the blowhole he could never fully transform away, how he would seduce young women and disappear before dawn, returning to the river.\n\nLuiza wasn''t afraid. At twelve, she was too young to be of interest to the Boto, and too old to believe in such tales without question. Still, she kept her eyes open as she navigated through the crowd, balancing carefully on the wooden walkways that connected the floating homes.\n\nThe music grew louder as she approached the central platform where the celebration was in full swing. Couples danced to the rhythm of drums and flutes, their feet stamping in time on the wooden boards. The aroma of grilled fish and sweet manioc cakes filled the air.\n\nThat''s when she saw him—a young man standing at the edge of the platform, partially hidden in shadow. He was dressed in white from head to toe, and though he smiled at the dancers, he remained apart from them. Something about his stillness amid the movement caught Luiza''s attention.\n\nAs if sensing her gaze, he turned. Even in the dim light, she could see his eyes were the deep gray of river water at dusk. He smiled at her, and Luiza felt a strange recognition, though she was certain she had never seen him before.\n\nWithout thinking, she moved toward him, weaving through the dancers. But before she could reach him, her cousin Miguel grabbed her arm.\n\n\"Mamãe is looking for you,\" he shouted over the music. \"Come help with the food.\"\n\nWhen Luiza looked back, the man in white was gone. Disappointed but obedient, she followed Miguel to where her aunt was serving food to the villagers.\n\nHours later, as the celebration continued under the star-filled sky, Luiza slipped away to the quiet edge of the village. The wooden platform here extended out over the dark water, and she sat with her feet dangling above the river''s surface.\n\n\"You should be careful,\" came a voice beside her. \"The river can be unpredictable.\"\n\nLuiza startled. It was the man in white, now sitting beside her though she hadn''t heard him approach. Up close, she could see he was younger than she had first thought—perhaps sixteen or seventeen.\n\n\"I''ve lived on this river my whole life,\" she replied, trying to sound braver than she felt. \"I know its moods.\"\n\nHe smiled. \"Do you? I think the river still has many secrets to share with you.\"\n\nThere was something in his voice that reminded Luiza of the current—smooth on the surface but with hidden depths. She noticed he wore a woven bracelet of river reeds around his wrist, similar to one her grandmother had made for her last birthday.\n\n\"Are you from upriver?\" she asked. \"I don''t recognize you.\"\n\n\"I travel a lot,\" he said. \"But I always return to these waters. They''re home.\"\n\nHe reached into his pocket and pulled out a small object that caught the moonlight. It was a perfectly formed river pearl, iridescent and glowing.\n\n\"For you,\" he said, placing it in her palm. \"A reminder that the most beautiful things often remain hidden beneath the surface.\"\n\nBefore Luiza could thank him, shouts erupted from the central platform. The year''s fishing champion was being announced, and everyone was calling for the village elders to begin the blessing ceremony.\n\n\"You should join your family,\" the young man said. \"It''s important to honor traditions.\"\n\nLuiza nodded and stood up. \"Will you come?\"\n\nHe shook his head. \"I prefer to watch from a distance. But I''ll see you again, Luiza. The river connects us all.\"\n\nIt wasn''t until she was halfway back to the celebration that Luiza realized she had never told him her name.\n\nThe next morning, Luiza woke early and went straight to the water''s edge. The pearl sat on her bedside table, confirmation that the strange encounter hadn''t been a dream. As she looked out over the misty river, a flash of pink broke the surface—a river dolphin, arcing gracefully before disappearing back into the depths.\n\nLuiza smiled and whispered, \"Until we meet again.\"\n\nIn her hand, the pearl seemed to pulse with a light of its own, like a tiny captured star. Or perhaps, she thought, like a promise from the river itself.', 'A young girl from a riverside community encounters the mythical Boto Encantado during the annual river festival.', 5, NULL, true, NULL),
('city-of-dreams', 'City of Dreams', 'city-of-dreams', 'en', 'Kenji Matsuda had worked at the same securities firm in Shinjuku for fifteen years. Each day was identical to the last: the same crowded morning train, the same convenience store coffee, the same reports to file before the markets opened in New York. He had stopped noticing the city around him years ago.\n\nIt was nearly midnight when he finally left the office tower. A light rain had begun to fall, blurring the neon signs and turning the streets into mirrors. Kenji had missed the last express train and would have to take the local line, adding another forty minutes to his commute. He sighed and opened his umbrella.\n\nHe decided to cut through the narrow alleyways behind the main boulevard—a route he rarely took. The rain muffled the sounds of the city, creating an unusual pocket of silence. That''s when he noticed the door.\n\nIt was painted a deep blue that seemed to glow against the gray concrete wall. Kenji was certain it hadn''t been there before—he would have remembered such an unusual color in this monochrome part of the city. There was no sign, no indication of what might lie beyond it.\n\nPerhaps it was the lateness of the hour, or perhaps it was the strange quality of the rain-soaked night, but something compelled Kenji to approach the door. When he touched the handle, it was warm despite the cool air.\n\nHe opened it.\n\nInstead of a room or a hallway, Kenji found himself stepping onto a street that was both familiar and utterly changed. It was still Tokyo—he could see the distant silhouette of Tokyo Tower—but the crowded buildings had been transformed. Plants and vines cascaded from every balcony and rooftop. The street itself was free of cars, replaced by channels of clear flowing water. Bridges arched gracefully between buildings, and paper lanterns floated in the air without any visible means of support.\n\nKenji turned back, but the blue door had vanished. Where it had stood was now a solid wall covered in a mural of swimming koi.\n\n\"First time crossing over?\"\n\nKenji spun around to find an elderly man in a traditional indigo jacket watching him with amusement.\n\n\"I... where am I?\" Kenji asked.\n\n\"Tokyo,\" the old man replied simply. \"Just... a different layer of it. The city dreams at night, you see, and sometimes those dreams take form.\"\n\n\"I don''t understand,\" Kenji said.\n\n\"No one does at first,\" the old man said, gesturing to the cushion across from him.\n\nKenji sat, and the man poured him a cup of tea that steamed with impossible colors.\n\n\"Tokyo has many faces,\" the old man explained. \"The one you know is just the most recent mask it wears. But underneath, there are older versions that still exist in the spaces between moments. This Tokyo remembers the canals that once flowed through Edo. It remembers the gardens that stood where skyscrapers now reach for the clouds.\"\n\n\"But how is this possible?\" Kenji asked.\n\nThe old man smiled. \"The city is more than concrete and steel. It''s made of stories and memories and dreams. Those who have forgotten how to see can sometimes stumble into these hidden layers—especially between midnight and dawn, when the boundaries grow thin.\"\n\nKenji looked around at the transformed city. In the distance, he could see a traditional wooden pagoda rising where the Metropolitan Government Building should stand. Cherry blossoms bloomed despite the season, their petals drifting down to float on the canal waters.\n\n\"Can I... explore?\" Kenji asked hesitantly.\n\n\"Of course,\" the old man said. \"That''s why you''re here. But remember, you must return before dawn. The doorways close when the first train runs.\"\n\nKenji spent hours wandering through the dream Tokyo. He crossed bridges where salarymen like himself would normally be hurrying to work. He passed tea houses filled with patrons in kimonos who nodded to him as if he were a regular customer. Street vendors offered him foods he remembered from his grandmother''s kitchen—tastes that had been lost to time and convenience.\n\nIn a small park that should have been a parking structure, Kenji found a group of children playing with tops and paper balloons. They invited him to join their game, and for the first time in years, he felt the simple joy of play.\n\nAs the night deepened, Kenji found himself in a garden overlooking the city. Fireflies danced among the carefully pruned trees, and the moon seemed impossibly large in the sky.\n\n\"It''s beautiful here,\" he said to no one in particular.\n\n\"It''s your Tokyo too,\" came a voice. A woman in a summer yukata stood nearby, her face half-hidden by a folding fan. \"It''s always been here, waiting for you to remember it.\"\n\n\"I never knew,\" Kenji said.\n\n\"Few do anymore,\" she replied. \"They move through the city with their eyes on screens, never looking up to see the magic that surrounds them. They''ve forgotten that cities are living things with many layers of history and meaning.\"\n\nShe pointed to the horizon, where the sky was beginning to lighten almost imperceptibly.\n\n\"Dawn approaches,\" she said. \"You should find your way back.\"\n\n\"How?\" Kenji asked, suddenly anxious. \"The door disappeared.\"\n\nShe smiled. \"Doors appear for those who need them. Look for the color that feels like home.\"\n\nKenji made his way back through the dream city as the stars began to fade. The streets were emptying, the lanterns dimming. He felt a growing urgency with each step.\n\nThen he saw it—a red door set into a stone wall. The color reminded him of the lacquered box where his mother had kept her most precious photographs. Without hesitation, he turned the handle and stepped through.\n\nHe emerged into the familiar alleyway, now bathed in the gray light of early morning. The rain had stopped, and the city was stirring to life. Checking his watch, Kenji was startled to see it was 5:30 AM—the exact time the first train would be departing.\n\nHe made his way to the station, his mind filled with images of the dream Tokyo. As he waited on the platform, he noticed details he had overlooked for years—the pattern of tiles on the floor, the calligraphy on a shop sign, the way the light filtered through the station''s glass ceiling.\n\nWhen Kenji arrived at work that morning, his colleagues commented on his changed appearance.\n\n\"Did something good happen?\" his assistant asked. \"You seem... different.\"\n\nKenji smiled. \"I just saw the city with new eyes.\"\n\nThat night, and many nights after, Kenji would leave work early enough to walk home, taking different routes through the city, observing the details and textures of Tokyo''s many layers. He never found the blue door again, but sometimes, in the quiet moments between midnight and dawn, he would catch glimpses of paper lanterns floating above the traffic, or hear the distant sound of shamisen music drifting from an alleyway.\n\nAnd on his desk at home, he kept a small jar of water from the dream city''s canal—water that never evaporated and sometimes, when the light hit it just right, seemed to contain an entire world within its depths.', 'A Tokyo businessman follows a mysterious blue door into a hidden version of the city that exists between midnight and dawn.', 8, NULL, true, NULL),
('tell-tale-heart', 'The Tell-Tale Heart', 'the-tell-tale-heart', 'en', 'TRUE!—nervous—very, very dreadfully nervous I had been and am; but why will you say that I am mad? The disease had sharpened my senses—not destroyed—not dulled them. Above all was the sense of hearing acute. I heard all things in the heaven and in the earth. I heard many things in hell. How, then, am I mad? Hearken! and observe how healthily—how calmly I can tell you the whole story.

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
('gift-of-the-magi', 'The Gift of the Magi', 'the-gift-of-the-magi', 'en', 'One dollar and eighty-seven cents. That was all. And sixty cents of it was in pennies. Pennies saved one and two at a time by bulldozing the grocer and the vegetable man and the butcher until one''s cheeks burned with the silent imputation of parsimony that such close dealing implied. Three times Della counted it. One dollar and eighty-seven cents. And the next day would be Christmas.

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
('legend-of-sleepy-hollow', 'The Legend of Sleepy Hollow', 'the-legend-of-sleepy-hollow', 'en', 'External source: For the full text, please visit: https://www.gutenberg.org/files/41/41-h/41-h.htm#page_272', 'Ichabod Crane, a superstitious schoolmaster, competes with the local hero Brom Bones for the hand of Katrina Van Tassel, only to encounter the legendary Headless Horseman.', 45, NULL, true, NULL),
('rip-van-winkle', 'Rip Van Winkle', 'rip-van-winkle', 'en', 'External source: For the full text, please visit: https://www.gutenberg.org/files/41/41-h/41-h.htm#page_28', 'Rip Van Winkle wanders into the Catskill Mountains, meets strange men, drinks their liquor, and falls asleep for 20 years, awakening to find America transformed.', 30, NULL, true, NULL),
('yellow-wallpaper', 'The Yellow Wallpaper', 'the-yellow-wallpaper', 'en', 'External source: For the full text, please visit: https://www.gutenberg.org/files/1952/1952-h/1952-h.htm', 'A woman suffering from depression is prescribed a \', 30, NULL, true, NULL),
('the-birthmark', 'The Birthmark', 'the-birthmark', 'en', 'External source: For the full text, please visit: https://www.gutenberg.org/files/512/512-h/512-h.htm#birthmark', 'A scientist becomes obsessed with removing a small hand-shaped birthmark from his wife''s cheek, with tragic consequences.', 35, NULL, true, NULL),
('to-build-a-fire', 'To Build a Fire', 'to-build-a-fire', 'en', 'External source: For the full text, please visit: https://www.gutenberg.org/files/910/910-h/910-h.htm#to-build-a-fire', 'An unnamed man travels through the freezing Yukon Territory, ignoring warnings and struggling to build a life-saving fire as temperatures plummet.', 40, NULL, true, NULL),
('most-dangerous-game', 'The Most Dangerous Game', 'the-most-dangerous-game', 'en', 'External source: For the full text, please visit: https://www.gutenberg.org/cache/epub/1872/pg1872-images.html', 'After falling off a yacht, renowned hunter Sanger Rainsford swims to a nearby island where he meets General Zaroff, a Russian aristocrat who hunts humans for sport.', 45, NULL, true, NULL),
('monkeys-paw', 'The Monkey''s Paw', 'the-monkeys-paw', 'en', 'External source: For the full text, please visit: https://www.gutenberg.org/files/12122/12122-h/12122-h.htm#THE_MONKEY%27S_PAW', 'A family receives a mummified monkey''s paw that grants three wishes with terrible consequences.', 25, NULL, true, NULL),
('mr-elvesham', 'The Story of the Late Mr. Elvesham', 'the-story-of-the-late-mr-elvesham', 'en', 'External source: For the full text, please visit: https://www.gutenberg.org/files/11870/11870-h/11870-h.htm#story', 'A young medical student is befriended by an elderly philosopher who switches bodies with him through a drugged drink.', 30, NULL, true, NULL),
('open-window', 'The Open Window', 'the-open-window', 'en', 'External source: For the full text, please visit: https://www.gutenberg.org/files/269/269-h/269-h.htm#link2H_4_0001', 'A nervous man visiting the countryside is told a tragic ghost story by a young girl with a talent for mischief.', 15, NULL, true, NULL),
('signal-man', 'The Signal-Man', 'the-signal-man', 'en', 'External source: For the full text, please visit: https://www.gutenberg.org/files/1289/1289-h/1289-h.htm#link2H_4_0003', 'A signal-man working at an isolated railway cutting tells the narrator about ghostly apparitions that have appeared before tragic accidents on the line.', 35, NULL, true, NULL),
('lady-with-dog', 'The Lady with the Dog', 'the-lady-with-the-dog', 'en', 'External source: For the full text, please visit: https://www.gutenberg.org/files/13415/13415-h/13415-h.htm#THE_LADY_WITH_THE_DOG', 'Dmitri Gurov, an unhappily married Moscow banker, begins an affair with Anna Sergeyevna, a young married woman, while both are vacationing in Yalta.', 40, NULL, true, NULL),
('the-nose', 'The Nose', 'the-nose', 'en', 'External source: For the full text, please visit: https://www.gutenberg.org/files/36238/36238-h/36238-h.htm#THE_NOSE', 'Collegiate Assessor Kovalyov wakes up one morning to discover his nose has disappeared from his face and is now living an independent life as a higher-ranking official.', 45, NULL, true, NULL),
('queen-of-spades', 'The Queen of Spades', 'the-queen-of-spades', 'en', 'External source: For the full text, please visit: https://www.gutenberg.org/files/55024/55024-h/55024-h.htm#THE_QUEEN_OF_SPADES', 'Hermann, a young Russian officer, becomes obsessed with learning a secret card-playing formula from an elderly countess, with supernatural consequences.', 50, NULL, true, NULL),
('the-overcoat', 'The Overcoat', 'the-overcoat', 'en', 'External source: For the full text, please visit: https://www.gutenberg.org/files/36238/36238-h/36238-h.htm#THE_CLOAK', 'Akaky Akakievich, a poor copying clerk, saves for months to buy a new overcoat that transforms his life, only to have it stolen, leading to his death and ghostly return.', 55, NULL, true, NULL),
('the-necklace', 'The Necklace', 'the-necklace', 'en', 'External source: For the full text, please visit: https://www.gutenberg.org/files/3090/3090-h/3090-h.htm#link2H_4_0013', 'Mathilde Loisel borrows a diamond necklace for a high-society event, loses it, and spends ten years in poverty to replace it, only to discover the original was a fake.', 25, NULL, true, NULL),
('ball-of-fat', 'Ball of Fat', 'ball-of-fat', 'en', 'External source: For the full text, please visit: https://www.gutenberg.org/files/3090/3090-h/3090-h.htm#link2H_4_0001', 'During the Franco-Prussian War, a group of French citizens pressure a prostitute to sleep with a Prussian officer for their benefit, then treat her with contempt after her sacrifice.', 60, NULL, true, NULL),
('last-lesson', 'The Last Lesson', 'the-last-lesson', 'en', 'External source: For the full text, please visit: https://www.gutenberg.org/files/31253/31253-h/31253-h.htm#THE_LAST_LESSON', 'Young Franz discovers it is the last day French will be taught in his Alsatian village after the region''s annexation by Prussia following the Franco-Prussian War.', 20, NULL, true, NULL),
('hunger-artist', 'A Hunger Artist', 'a-hunger-artist', 'en', 'External source: For the full text, please visit: https://www.kafka-online.info/a-hunger-artist.html', 'A professional faster performs the art of starvation for public entertainment, but as interest in fasting wanes, he is relegated to a neglected cage in a circus.', 30, NULL, true, NULL),
('metamorphosis', 'The Metamorphosis', 'the-metamorphosis', 'en', 'External source: For the full text, please visit: https://www.gutenberg.org/files/5200/5200-h/5200-h.htm', 'Gregor Samsa wakes one morning to find himself transformed into a giant insect, leading to his family''s horror, neglect, and eventual relief after his death.', 90, NULL, true, NULL),
('in-a-grove', 'In a Grove', 'in-a-grove', 'en', 'External source: For the full text, please visit: https://www.gutenberg.org/files/69606/69606-h/69606-h.htm', 'Multiple, contradictory accounts of a samurai''s murder are presented, revealing the self-serving nature of each narrator and leaving the truth ambiguous.', 25, NULL, true, NULL),
('rashomon', 'Rashomon', 'rashomon', 'en', 'External source: For the full text, please visit: https://www.gutenberg.org/files/69606/69606-h/69606-h.htm', 'During a time of famine in Kyoto, an unemployed servant takes shelter in the dilapidated Rashomon gate and encounters an old woman stealing hair from corpses.', 20, NULL, true, NULL),
('true-story-of-ah-q', 'The True Story of Ah Q', 'the-true-story-of-ah-q', 'en', 'External source: For the full text, please visit: https://www.marxists.org/archive/lu-xun/1921/12/ah-q/index.htm', 'Ah Q, an uneducated peasant known for his \', 70, NULL, true, NULL),
('arabian-nights-selected', 'The Arabian Nights (Selected Tales)', 'the-arabian-nights-selected-tales', 'en', 'External source: For the full text, please visit: https://www.gutenberg.org/files/51252/51252-h/51252-h.htm', 'Scheherazade tells King Shahryar a new story each night to postpone her execution, weaving tales of adventure, romance, tragedy, comedy, and the supernatural.', 40, NULL, true, NULL),
('sun-moon-sky', 'Why the Sun and the Moon Live in the Sky', 'why-the-sun-and-the-moon-live-in-the-sky', 'en', 'External source: For the full text, please visit: https://www.gutenberg.org/files/39308/39308-h/39308-h.htm', 'The Sun and his wife, the Moon, invite their friend Water to visit their home, but are forced to retreat to the sky when Water and his relatives fill their house.', 10, NULL, true, NULL);

-- Insert story_authors relationships
INSERT INTO story_authors (id, story_id, author_id) VALUES
('55c54c11-58b3-4098-9bd7-dafdbc0d0385', 'mountain-secret', '851b0a14-ba3f-4712-9ea2-eec4a38cf7a2'),
('7d76a183-78be-4af2-86a3-eb7455ed6a7d', 'river-spirits', '702c307b-09dd-4a40-a546-0402c1ea982b'),
('b5acea0d-7cf0-4ddd-8256-75aaaedf8cdd', 'city-of-dreams', 'c3164007-2e6f-47e7-98b8-2a8a8c971ab2'),
('37f14d78-da9b-4c73-9d8d-0d63b294e6ea', 'tell-tale-heart', 'a23200ff-3150-478d-91fa-0e8c1eec1077'),
('9a6e11ac-e936-4e85-90ce-ef66cc8e67b6', 'gift-of-the-magi', '737e1a6f-8ebd-46be-b9e8-e42aa56a6df1'),
('da4fb971-db20-43e5-9957-d3fd295f836e', 'legend-of-sleepy-hollow', '36758edc-2b23-41e9-8a63-dc4f0bf03029'),
('b4f2b489-edd1-4f51-9e46-1a15e2dc2267', 'rip-van-winkle', '36758edc-2b23-41e9-8a63-dc4f0bf03029'),
('e62cbc07-e67b-4416-9a6a-d6fde10162e1', 'yellow-wallpaper', 'b4998a8a-23a6-4c77-aca9-b2205f30381b'),
('413458be-0212-4ff3-9c10-1f86f3e4807f', 'the-birthmark', '64167a9e-4005-4680-b4e5-e3ef397f1854'),
('f3fed3e7-dfb9-4927-86bb-f7c1f808cfff', 'to-build-a-fire', 'f865ba4b-2d8d-46f1-9198-307588e3eb9b'),
('4c5623ce-b909-42eb-b7ea-dad7be112a08', 'most-dangerous-game', '74cb5541-889f-430a-b174-bc174ebb1bd2'),
('53dd4a22-374b-4233-a5ec-566766b86a42', 'monkeys-paw', 'c2429747-3ec9-4037-aae7-26509a2cb28c'),
('941f5a9a-b444-4f01-8cdb-758b591c2f67', 'mr-elvesham', '9674eb74-4367-4419-8ba6-2131e834503f'),
('33919c08-308c-4c09-aac9-aea12f9758ca', 'open-window', '87eab8b7-caeb-4e1f-b1e7-8fd9d3248fc3'),
('63a5f301-d6a9-402a-a268-007294da844e', 'signal-man', '37833f4a-f55a-448b-a4e0-33fe8f988037'),
('0da7020c-b9a7-4d73-a2e5-4a433bb340d6', 'lady-with-dog', '992bdedf-e975-448a-8ea6-0aca06b24d15'),
('ba70b78c-0da8-446f-9d61-73a564e2f418', 'the-nose', '378e35d4-c7e0-43a6-9645-eddac94f0fde'),
('687a32e8-a8b2-489d-976a-5b66cc33e517', 'queen-of-spades', 'dff209af-c3d3-430a-9b98-6655d6468a53'),
('0ef91da7-f427-4808-b609-ec3c0b86f707', 'the-overcoat', '378e35d4-c7e0-43a6-9645-eddac94f0fde'),
('37614f15-ae3a-498a-9bd1-295b062d6a43', 'the-necklace', '8d4a07e9-f480-454a-b03c-2df3f639913f'),
('ddac7ecc-dce1-4432-bce7-fd27ed5f8c24', 'ball-of-fat', '8d4a07e9-f480-454a-b03c-2df3f639913f'),
('5b4e8841-0079-4747-b6fc-9d960021890b', 'last-lesson', '47cabbed-a6a0-46e5-8760-86fb3061a5ec'),
('476bfa03-788b-4413-8807-27bf419fc38d', 'hunger-artist', 'f46a2304-3110-4713-9391-fcb47ddfc2c2'),
('2fbba2fd-54cd-48ce-ad0d-90dcdfb5ebc1', 'metamorphosis', 'f46a2304-3110-4713-9391-fcb47ddfc2c2'),
('ebf462fa-9085-41fe-9d10-65829c615c4b', 'in-a-grove', '9c1537d5-43aa-4bba-b47f-bdb71762131a'),
('0dd783ad-5ba6-4b38-8b24-a777cf4a7404', 'rashomon', '9c1537d5-43aa-4bba-b47f-bdb71762131a'),
('8646c8c2-b60f-4006-a835-83aa55b5fad7', 'true-story-of-ah-q', '42a43139-1af0-478c-bfac-95067815d115'),
('38fa88c6-543b-46d5-aff0-b373942ce82d', 'arabian-nights-selected', 'a5eb1dd8-33ba-41f5-bc07-8a72c372a28b'),
('d00cb730-f16c-4d80-892f-bb5b296ea471', 'sun-moon-sky', '6e475168-e410-4b18-abf7-356d4d1fe195');

-- Insert story_locations relationships
INSERT INTO story_locations (id, story_id, location_id, location_role) VALUES
('b1784e3a-c343-4956-ac2a-ce5e36d3430f', 'mountain-secret', 'b402faf1-ab07-43f5-9c65-337fef6ef354', 'setting'),
('dbeec37b-2824-49be-adc4-7a3eb4e77522', 'river-spirits', 'b59c3b92-8998-4e5a-bdaa-d4408d53acc4', 'setting'),
('dad060cd-47d6-4aad-852f-e33d2e6920e3', 'city-of-dreams', '2cc0e2db-5823-4f12-ae64-6fd0bd38ed5a', 'setting'),
('eb8b075f-b6c3-4ffc-a54c-a07ac4ff604e', 'tell-tale-heart', 'd99d7224-d740-473e-ab2f-cedb3878acbf', 'setting'),
('486f4f1e-522e-422b-bdb0-f505f56e5e75', 'gift-of-the-magi', '783f16c8-56e5-467f-91d0-bc0cc91d0196', 'setting'),
('36607571-8211-4fc6-b88c-a7c75e59fc8c', 'legend-of-sleepy-hollow', '8f27ce3d-6c31-4144-8fff-eb86e121e42b', 'setting'),
('bd8a270c-deca-450a-aeda-9cc6644dcf38', 'rip-van-winkle', 'd6afcc99-c2fd-49ab-a35f-4d8cc47f8e72', 'setting'),
('eae1b897-382e-415d-ab28-092dc71f59ed', 'yellow-wallpaper', '6ada090c-23bf-4860-98ac-c4137b914f03', 'setting'),
('2e104b71-31a6-425e-9f5e-290e80ac4275', 'the-birthmark', '3e0af2de-fafb-4c48-a261-2c78f827f1d0', 'setting'),
('d6ede428-005d-4859-8571-7ae71a0f0d0a', 'to-build-a-fire', '6621679e-93e6-47a7-b191-25cda786f512', 'setting'),
('6e964e7f-6e20-40c6-b63b-bdb2f4eae1b6', 'most-dangerous-game', '69bfcec1-b700-4596-88eb-8c6e66aaded3', 'setting'),
('46faa00c-650e-48ad-82e0-520732faa2c0', 'monkeys-paw', '57d2e853-86f1-426b-b367-ecdf78b30abf', 'setting'),
('dba526f0-e8d1-42f8-a49d-0dadc6639c9d', 'mr-elvesham', '57d2e853-86f1-426b-b367-ecdf78b30abf', 'setting'),
('2d48f7c3-a022-4e8a-b5af-f6b77c130fb8', 'open-window', '2758a085-6224-4c65-9bd8-cfe1b1cda7ee', 'setting'),
('ba7db6d5-35a7-4e6f-9ef0-283c3c75ef54', 'signal-man', '010ef677-2863-488c-b115-833568080553', 'setting'),
('230a468a-1706-44dd-8ab3-bd2bc995f8b3', 'lady-with-dog', '10db854a-bb0f-4206-9e7c-350311bdf660', 'setting'),
('d35c8b74-2496-4276-97ef-ae8b5efc85a1', 'the-nose', 'ad860993-7e04-4eba-9e78-dccedec11302', 'setting'),
('53e27165-a409-41e4-b124-f5dec062237b', 'queen-of-spades', 'ad860993-7e04-4eba-9e78-dccedec11302', 'setting'),
('ddc08c79-3927-44d5-b5af-99e56d2db0fe', 'the-overcoat', 'ad860993-7e04-4eba-9e78-dccedec11302', 'setting'),
('45817e45-3ffe-433e-937e-d4a6d309a4e4', 'the-necklace', '9d91a5e2-dbb0-481f-99e7-d4f8636b601c', 'setting'),
('83515aba-cd4d-4447-bcde-ec6ce0802691', 'ball-of-fat', '02d7113e-5519-4ed1-91b8-56108308133b', 'setting'),
('74c96d56-989f-4d11-9cbf-8393aa4d9648', 'last-lesson', '8dde9882-e690-4e85-8506-e36ace5e1ddf', 'setting'),
('3a26fad8-e599-473d-912c-a75793d99310', 'hunger-artist', 'f643f836-8917-4b88-bcd6-938f6ebf0748', 'setting'),
('fa5a6c1c-7b5c-4e7d-ad8c-2fbb7c4e3d49', 'metamorphosis', 'f643f836-8917-4b88-bcd6-938f6ebf0748', 'setting'),
('33566e52-c3d4-4001-b467-32cceba2101c', 'in-a-grove', 'de1c9717-f6cb-40e4-a08d-e535e19bbd4e', 'setting'),
('91c98938-bc2b-4dd3-8852-79a175cfdade', 'rashomon', '82f8dc49-2736-4a5b-884a-a8f78d1922cf', 'setting'),
('14ee54e4-ab09-486a-afc5-c225fa6da22b', 'true-story-of-ah-q', '3c1118a0-5eaa-4ef5-98a8-0f5eabdc8059', 'setting'),
('7ec7fc6d-7e27-495a-b322-d169f829ea9b', 'arabian-nights-selected', 'fc72874f-757f-4fac-b6d5-5865f1a7338e', 'setting'),
('f1f11d41-87d5-4528-beaa-4cff5c3b62b7', 'sun-moon-sky', '2af5b5e3-1e75-4d03-a239-c4a7dabc4db0', 'setting');

-- Insert story_themes relationships
INSERT INTO story_themes (id, story_id, theme_id) VALUES
('8a372a3e-d3ff-448c-9769-ea6a2a51852d', 'mountain-secret', 'c677389c-304e-4b7d-8549-208be797c21e'),
('03173712-f7fe-4629-9312-eb7407b87521', 'mountain-secret', '5beda0e8-606d-4211-b451-0d8df812626d'),
('6baeda9d-6f36-4a78-aa58-4f43d1c2e657', 'river-spirits', '92da3398-c385-43e3-b75a-eb8c32faee54'),
('354a4969-e5a0-4971-aafb-20d56d85c31f', 'river-spirits', '5beda0e8-606d-4211-b451-0d8df812626d'),
('5f26ff3f-779c-4049-8526-aabef166afa9', 'city-of-dreams', '98ac941f-c5d0-458a-8027-6156b000683f'),
('4cad9b1e-2468-43b0-ba72-5ef2093761c9', 'city-of-dreams', 'c677389c-304e-4b7d-8549-208be797c21e'),
('3abfcc09-d51d-4bb1-b10a-e7dc347eeb1e', 'tell-tale-heart', '26917ae9-1b26-4e4a-b24c-9e124d0a4db6'),
('f32b120a-d8e6-410b-b879-2559dbb7c154', 'tell-tale-heart', '797f6d67-ad7a-495f-b404-57d4ba241fb9'),
('76fc0210-df74-439c-a2aa-0bb6fabffed6', 'tell-tale-heart', '1bfcbb27-1825-4374-ba64-eecbda0cd989'),
('6a22cfa2-c8a1-4acd-b5f1-29dcc966510d', 'tell-tale-heart', 'e445cc42-bca5-4213-a54c-38b6304a4a94'),
('74eb8e55-dc67-4981-b95a-98de24d0e43c', 'tell-tale-heart', '6da376d5-7cc8-481d-b152-4a87f9f6ffa2'),
('972dba15-5e4b-464a-a040-e36ddb08e826', 'gift-of-the-magi', '594d8dd0-35c2-4705-a631-b3e740debb71'),
('e5f0e1db-30d8-4805-ad20-d97f2a0b93e8', 'gift-of-the-magi', '0c1d99e8-2626-45e9-83b2-8e65368ea093'),
('acd698dd-b549-49b3-980c-99286f558e05', 'gift-of-the-magi', 'f03810e4-86d7-4b33-b543-1545254219c4'),
('bbb724d8-0f86-454c-b0e9-c4c15e3904d8', 'gift-of-the-magi', '5a7a27a6-4326-42e9-8a68-a05cf227b39b'),
('35ef1c9a-1d07-42e7-b5ba-2eee6a1d85ba', 'gift-of-the-magi', 'fb208296-fc80-4949-8454-24964be762c8'),
('c7a59833-0ded-4eec-bfa2-21d36c4d8d20', 'legend-of-sleepy-hollow', '4cd56ba4-33f9-4c97-b84e-bfde2717f1f9'),
('965f6bbf-13f8-435a-83b2-6eac76bc8315', 'legend-of-sleepy-hollow', '650049dd-4b06-4bf5-b206-3787d1b52b11'),
('5e9e7458-f1e8-45f3-9901-7f05209312f9', 'legend-of-sleepy-hollow', 'b3abff23-116e-440b-981d-5b9778449207'),
('85553306-b07c-4765-b2a0-93b0be7d9548', 'legend-of-sleepy-hollow', '92da3398-c385-43e3-b75a-eb8c32faee54'),
('1a6d48be-83e9-4a43-b706-3733ff67162a', 'legend-of-sleepy-hollow', 'adcceab8-6295-42be-aa62-697b912e031c'),
('7c0b7c92-fcb2-4ee1-aeb1-1297d5b63a54', 'rip-van-winkle', '6fe7797c-93a0-4816-a617-248682bd094c'),
('607aec74-bc84-435b-bce2-588dbaf0dddb', 'rip-van-winkle', '4a87a5ea-6aee-44df-b8f5-5183aeec9943'),
('67194a07-da4a-40ab-b879-3e0fb339ef7f', 'rip-van-winkle', 'b232add0-5900-4baa-add6-f37dac2ca6e5'),
('13c2f92f-e2af-4944-9432-9aeafe97d6e8', 'rip-van-winkle', 'ba7177cc-f599-4a22-9ac3-8f0cb5f450df'),
('2680a450-24d7-47c9-aad4-c962a09c7255', 'yellow-wallpaper', '7e7abb86-a0de-408c-abe7-7b72d3993e5e'),
('a12ef1ff-fcad-4d10-b899-3a7fa1761b16', 'yellow-wallpaper', '286648a7-e45d-4c5e-8685-4e7a8df88e45'),
('84c954f1-2203-458a-b073-6553ccb0824c', 'yellow-wallpaper', 'bb368dec-edb1-42b1-9e06-98014acff26b'),
('70778c83-f221-41d8-bf69-fe7e818ede90', 'yellow-wallpaper', 'b9c9daae-f4cd-4e79-8b0f-3a545e7723b6'),
('bc2caf48-3c51-4caf-992d-b0171cbc2c44', 'yellow-wallpaper', '8c3f2ae6-fb69-4e93-94c0-bb022748b87b'),
('c8d20c21-f95d-4849-a1be-58e7cc5584fc', 'the-birthmark', '8f78ca05-425b-4d8e-88dc-1e4d2960b69e'),
('afc4644a-db82-41af-8263-8a5e1762e8d0', 'the-birthmark', '547554f3-2aeb-4df2-a532-2ae29284a6fc'),
('c5a907c9-7ba5-43dd-a339-d88880a4322b', 'the-birthmark', '30aa606b-9e6a-4aa6-829b-901f5b7b55fe'),
('0826761e-77c6-45dd-94f9-45579354dbce', 'the-birthmark', 'c724046a-9874-490f-af60-a14f132fcb20'),
('b7031623-106e-40f7-a8a1-14145028f98f', 'the-birthmark', '7c369215-89e3-4fb4-b383-5cecca94de7b'),
('d133e906-dc8d-4aca-92f1-634505daa8b5', 'to-build-a-fire', '49fef05e-99c5-4812-bf93-db6b5bf253a9'),
('3f527505-2ce3-4370-8734-cef2387f0cfd', 'to-build-a-fire', '72c01fde-5606-4526-92b7-04663413d7de'),
('496c47dd-2281-402a-8a49-977a342acab9', 'to-build-a-fire', '30aa606b-9e6a-4aa6-829b-901f5b7b55fe'),
('8211a3e3-dbb0-4703-a4d6-21c3f6559f39', 'to-build-a-fire', 'fc56cf98-8f1d-4d8b-836b-d2b387d7001a'),
('302ffd81-e75d-4c0e-a228-f95b47642001', 'most-dangerous-game', '60e4ed85-613b-4ba8-ae24-26f0145350e7'),
('e688222b-199c-4964-811a-3285cadc4ca5', 'most-dangerous-game', 'd2ccee91-1b0f-411b-8a4a-04c2b9803220'),
('68891f3b-c912-4809-9d47-c3e7771653db', 'most-dangerous-game', '72c01fde-5606-4526-92b7-04663413d7de'),
('eb076b8a-aaef-4592-bc71-dc0a4c352dc2', 'most-dangerous-game', '45c2411c-74f3-473f-9b0b-88194498e6fe'),
('b6463a00-9fd1-4713-a4a9-fb2b907e30d8', 'monkeys-paw', '619377f8-445a-48c7-9ec8-0e53e8e37574'),
('d334cb79-da52-49d8-8471-ed5e3989272d', 'monkeys-paw', 'db6f1b1b-61ab-4a49-97a1-5252000681e2'),
('f8dfe84b-dd02-44ec-b725-c97644775958', 'monkeys-paw', '7c837883-0496-4d17-84af-2b3924085542'),
('18443199-5cf7-4649-9289-8feaf846eba8', 'monkeys-paw', '6a15a50a-186d-451e-b522-c2090fc4e274'),
('c5909af1-57aa-443e-9793-4241163a6d2d', 'monkeys-paw', 'b0bc87bd-f07e-4640-9655-cdc23f62dff2'),
('117d3df2-caf5-42d7-a6fe-ff7d689628d7', 'mr-elvesham', '268b8984-b1c4-4225-b52c-76ff1dddf18a'),
('f6ba2b5e-dbd8-4d60-975d-81ef23cfef3b', 'mr-elvesham', '14635c03-c2bc-4f14-b781-6e8a0aaf4f95'),
('094c60fa-4178-45bc-9bc4-d3e418f08430', 'mr-elvesham', 'e8fc627f-a79f-4416-b4cd-28d168a0db11'),
('eecb8b14-4f59-4fa2-acfa-e43052b62b3a', 'mr-elvesham', 'f558ca47-cb54-4992-ba44-8c6d25a2df99'),
('18474ddd-d3e0-49b4-8ec0-cf914683cedf', 'open-window', 'f04bf71e-6e06-49e9-8183-c03552e899d3'),
('a81b7f9f-11ae-4b04-b8a1-a7c2ed1d9e3b', 'open-window', 'c3822734-f5ff-4ab0-88b7-56b678f798b2'),
('b47b887a-f9c0-4c1f-95dd-bf18c01f0148', 'open-window', '05ff0e9c-64fd-4ef0-b161-817ef21d0a58'),
('34677633-de51-4b80-abda-021d4b9e107b', 'open-window', '08d14df8-6226-4b08-8614-7f0d2bb8791e'),
('ee5ea3ad-0cd1-47b5-91a7-259589b56cf3', 'signal-man', '3b7ba184-4e64-459b-aa37-f9bb681cb0a2'),
('3c6bd9d9-f1ff-4040-b3b5-27183439752c', 'signal-man', '619377f8-445a-48c7-9ec8-0e53e8e37574'),
('95e917a3-6d67-4536-a9c5-f8c2e7055f3a', 'signal-man', '06f2234e-91d4-43de-ba1a-456efc86b1dd'),
('7c02f133-3ef2-4e54-8938-01164ed808ee', 'signal-man', '40a29ae6-e3de-4c2e-878d-42dfdbf55a06'),
('0a30d6dd-5dcb-4a74-97eb-25cc7d4ff74a', 'lady-with-dog', '594d8dd0-35c2-4705-a631-b3e740debb71'),
('350a662c-7372-49f3-8e95-e406e4e23822', 'lady-with-dog', 'd7b29b49-b2c2-4f2e-9315-f1b20fc164b3'),
('fc1f8483-3111-4d2a-a036-ead9c4554c0f', 'lady-with-dog', 'd1cff137-0ade-4e6b-ae31-e5bfb3fd0329'),
('ab80bfd4-78ab-4399-b757-fb726724802a', 'lady-with-dog', '017bb01c-68de-4c22-92d6-fe1ad65b4407'),
('42266aec-0a45-420b-a9df-2386f82c5ff4', 'lady-with-dog', 'd8061586-7ea1-4a48-82bd-a25c1b2b652d'),
('eea17367-7c3a-4a9b-95bf-a792771c9808', 'the-nose', '268b8984-b1c4-4225-b52c-76ff1dddf18a'),
('af54c7ea-0b15-46a3-b408-0e6bcb3dd793', 'the-nose', '3400937e-4383-4eeb-92f5-6e7f387ff265'),
('2ce1a244-6b7e-4cdf-adef-0a0b4a0d0905', 'the-nose', 'f9420218-9cad-473d-8df0-725b282a3edc'),
('2459b088-7966-477f-8bfc-297b2f138dbd', 'the-nose', '6b50fa71-8bf8-4aab-8059-9e491984852a'),
('3fcff5f6-6948-4375-ad21-9de8b1e6068e', 'queen-of-spades', 'fcc42697-5a5e-4f65-9ea4-a3a133fab510'),
('fa5de637-70d1-40fb-a229-c42fdcfd2b3b', 'queen-of-spades', 'db6f1b1b-61ab-4a49-97a1-5252000681e2'),
('cb2eb98b-f889-4a8e-9a12-4895d4468595', 'queen-of-spades', 'b0bc87bd-f07e-4640-9655-cdc23f62dff2'),
('9a51f3b0-4524-4af4-a811-0d80cf10724f', 'queen-of-spades', '6a744de1-c774-424e-ab64-66e3ce58bf5e'),
('27d2b053-2e38-4333-aa33-0841ad2db888', 'queen-of-spades', '619377f8-445a-48c7-9ec8-0e53e8e37574'),
('f7e31bc8-7420-43f2-82eb-6fe20291b66a', 'the-overcoat', '5a7a27a6-4326-42e9-8a68-a05cf227b39b'),
('bdcacc4f-f743-4ee3-a8eb-b49b226ca85e', 'the-overcoat', '6b50fa71-8bf8-4aab-8059-9e491984852a'),
('eb421bb2-77c5-4773-a1a7-0c000cad3abe', 'the-overcoat', '0a661336-6ae6-4a9f-bf5b-84e4a6fa6ea1'),
('2808745c-3c1e-4323-9f1a-0b4e77a43f25', 'the-overcoat', '6048a5fd-9833-4d74-83e1-3550e82bb7bf'),
('1e1c1ced-3f66-4204-8a0e-f65941477841', 'the-overcoat', '375cc43a-f829-4d77-a821-5d0caaf031cb'),
('417dad2a-fbf3-49d4-8dc2-1b3b259fcf88', 'the-necklace', 'fe005739-5300-44c2-8028-9a3d68e7fa3f'),
('8de7ce0c-5080-482c-9148-63556bb4efbc', 'the-necklace', 'f04bf71e-6e06-49e9-8183-c03552e899d3'),
('1e07e854-7f46-434f-8d03-256f634dfde3', 'the-necklace', 'f0c5d2f3-dc50-410d-8d0c-9639bd9b1841'),
('e855bd29-b12d-47f1-a22e-e20e9eaa95e3', 'the-necklace', '6048a5fd-9833-4d74-83e1-3550e82bb7bf'),
('7732fb62-21e7-4f75-b5d9-a7c07ab7c941', 'the-necklace', 'f03810e4-86d7-4b33-b543-1545254219c4'),
('3fb49d74-008b-4926-b186-ad2fc99e54eb', 'ball-of-fat', 'f563ed23-e807-46ff-ac9e-81dd35bcdd0c'),
('015f4c00-9e51-4699-a0b1-d03cc49138e8', 'ball-of-fat', '0c1d99e8-2626-45e9-83b2-8e65368ea093'),
('33d9086a-2d23-4629-b04b-57192dca3899', 'ball-of-fat', '87ff8a43-6cfb-404f-ab49-e4270a979b4a'),
('77dbf087-a93f-4615-b5cc-8332bac3c5db', 'ball-of-fat', 'e7406028-3d51-49be-83e9-2c58c4682e58'),
('3321fc5a-d5c6-4b4f-b73b-bb14e64c4cd3', 'ball-of-fat', '5fe7600e-ee5c-4b52-83bf-4a93fac44ea4'),
('8bf8294a-1a1d-49f3-9ee4-1fd524a9a10a', 'last-lesson', 'e7406028-3d51-49be-83e9-2c58c4682e58'),
('e33f23f0-56ab-41eb-83a6-e0f818b71df4', 'last-lesson', '6b2b900b-863c-4e40-81c2-58f7c037cd0a'),
('f18d963b-813d-4f4c-b525-aecd41d3bb96', 'last-lesson', '268b8984-b1c4-4225-b52c-76ff1dddf18a'),
('d4567971-8a14-4284-8e13-266bc891d74c', 'last-lesson', '79aca7bf-3d25-43bb-a0cc-89ebb4ad757a'),
('5795986c-5b20-4bc8-8a10-6e729a5e18f5', 'last-lesson', '1dce3827-b2c6-407a-b50b-fa36389c0806'),
('cf759667-fe3d-46a7-b9e7-9b0b7a230e01', 'hunger-artist', 'c2a51719-d37e-4200-aa06-0221a411630a'),
('71eec6dc-257d-4f04-af9d-eca6cdee7a5a', 'hunger-artist', '40a29ae6-e3de-4c2e-878d-42dfdbf55a06'),
('e6c15771-7ccf-47f4-911b-2b8f6ac1a57b', 'hunger-artist', 'f2f7039b-d8a9-4402-9de6-b419b7963a5b'),
('51153d4e-3b97-472c-8445-8810a65e26b6', 'hunger-artist', 'a73dc175-d123-4ef1-9e90-fb21fd1ccf5f'),
('302e53ad-3301-4d6d-9ffd-485c39d2532b', 'hunger-artist', 'c845e01a-c2e3-4cdf-8427-ae0c65a5afa3'),
('3e7e1922-e03d-48aa-958c-82b4c8aaefda', 'metamorphosis', 'd2d9877f-4da5-4df3-93a2-986b8fb76556'),
('1f152291-9b85-497a-86ff-a05c4d411bd9', 'metamorphosis', '268b8984-b1c4-4225-b52c-76ff1dddf18a'),
('b8209f9e-5161-40ff-b82b-814351d00f6d', 'metamorphosis', 'ff103109-d702-4def-90e3-00b85c05d6be'),
('9fc6bcaf-0f63-43d9-8595-7542677dee93', 'metamorphosis', '6319bae4-ba15-41aa-920e-6e678a492984'),
('a94cfae6-c953-4424-9ac3-2fbebb01ffe7', 'metamorphosis', '41c9b142-3be6-46e5-91fd-391af97ceb12'),
('6c15f924-f3dc-41d9-ad46-7a7d77f347e1', 'in-a-grove', '6e0f8b66-22bc-45ba-a155-a8972b6daebe'),
('f0792721-a9fe-473b-bbc9-8ce450fc3511', 'in-a-grove', 'e5cf9fd7-70c1-4fa3-be9f-7beb8c940304'),
('742d6259-cba8-4b25-99aa-bb49933f2963', 'in-a-grove', '836dfdbf-eea5-4694-a413-25df67f0b05e'),
('fdf56ba6-da60-4242-80ac-c6d26ce24cb4', 'in-a-grove', 'f04bf71e-6e06-49e9-8183-c03552e899d3'),
('00c00c52-95a3-41ed-ac52-42105001a23a', 'in-a-grove', '66993ea0-3b39-4caf-bcf2-8dcb4d1ca0c4'),
('07cb2e73-c6f1-48b6-87bb-c0a5bf110558', 'rashomon', 'afdc77e3-6ceb-4f7d-8685-12bc9b950b78'),
('6a255931-f0a4-42c6-8585-55f8bb5e1fd2', 'rashomon', '72c01fde-5606-4526-92b7-04663413d7de'),
('ff2e34cf-9115-4eea-aadd-34188561c117', 'rashomon', '836dfdbf-eea5-4694-a413-25df67f0b05e'),
('c4a908fa-dd91-4f1d-8efa-b046a9503aef', 'rashomon', '4665b2f5-4725-4b99-b423-0ea004697bc3'),
('39a62537-8002-4b03-b990-d183fc2a327a', 'true-story-of-ah-q', '43ed0291-b8c8-4a39-8d94-223f59bf9dd5'),
('9fe2cb9f-1133-40a5-b4ab-7ba7892297f9', 'true-story-of-ah-q', '424b4868-e0b5-40cd-af01-a07170021e55'),
('fca0afa1-c19b-4f25-a391-85041656546d', 'true-story-of-ah-q', 'a4176b65-862e-418e-9d06-a949fbece757'),
('5ce67cba-88a7-425b-84ca-cfe649018f67', 'true-story-of-ah-q', '4b8f25ed-f855-4091-898e-a80a53c0891a'),
('cdd40e47-5be3-4943-924e-b182b2549d76', 'arabian-nights-selected', '0263c4c6-ae47-48f7-941f-499ff06641bd'),
('24d6570e-7fba-4536-9e50-c228906cbb77', 'arabian-nights-selected', '619377f8-445a-48c7-9ec8-0e53e8e37574'),
('ed10f0bd-d2fa-4e9c-89a7-e75474661828', 'arabian-nights-selected', '375da9fb-8bd2-4dce-837d-0302d5129a12'),
('b2f5b835-13db-4c4b-bd95-a099377eae23', 'arabian-nights-selected', 'ba4082a5-3a58-4eb0-81e4-b3a175246504'),
('ee20e9c8-6a8f-456c-9c2c-cba10e5a9caf', 'arabian-nights-selected', 'b0bc87bd-f07e-4640-9655-cdc23f62dff2'),
('07a72feb-4859-4934-b6eb-4e941d9c4690', 'sun-moon-sky', 'cc659bd6-c485-434e-8c04-ed3abc3cf6ae'),
('032fb866-58ee-4e17-9beb-679af13f5dcf', 'sun-moon-sky', 'f31b30f4-d967-4087-8c8e-ab8c3f50798f'),
('d6c1f727-8e05-47cf-8271-8eecef6652a4', 'sun-moon-sky', 'e6f2aa8c-6f24-48ae-9fa8-eabe928e2a97'),
('b3c228dd-f8d9-402e-895d-8bb6effcbb79', 'sun-moon-sky', 'dcbc0754-ecdf-4e71-9056-0a6c8ad9e987');

-- Insert cultural_contexts
INSERT INTO cultural_contexts (id, story_id, context_text, language_code) VALUES
('9849bce9-d933-426f-bcd9-aa39a6a220a1', 'mountain-secret', 'In Sherpa culture, mountains are not merely geological formations but sacred entities with their own spirits and guardians. Mount Everest, known locally as Chomolungma, is considered the ''Mother Goddess of the World.''\n\nBefore climbing expeditions, Sherpas traditionally perform puja ceremonies to ask permission from the mountain deities. These rituals involve offerings of food, incense, and prayers to ensure safe passage.\n\nThe concept of sacred valleys hidden within the Himalayas appears in many Sherpa legends. These places are often described as beyul—hidden valleys blessed by Guru Rinpoche that serve as sanctuaries during troubled times.\n\nThe story reflects the tension between traditional Sherpa spiritual beliefs and the modern Western approach to mountains as challenges to be conquered. It also touches on the ethical questions surrounding the commercialization of sacred spaces and the environmental impact of climbing tourism in the Himalayas.', 'en'),
('08b5af50-ac83-4d07-af0d-11f6de700161', 'river-spirits', 'The Boto Encantado (Enchanted Dolphin) is one of the most famous legends of the Amazon River Basin. According to folklore, the pink river dolphin (Boto) can transform into a handsome young man who seduces young women at village festivals and celebrations.\n\nIn traditional stories, the Boto always wears a hat to conceal the blowhole on top of his head, which he cannot fully transform. He is said to be an enchanting dancer and impossible to resist when he sets his sights on someone.\n\nThe floating villages of the Amazon are real communities where houses, schools, and shops are built on floating platforms that rise and fall with the river''s seasonal floods. These communities have developed a unique relationship with the river, which serves as their road, food source, and the center of their cultural identity.\n\nThe River Festival described in the story is similar to real celebrations like the Festival of Boto, where the pink dolphin is celebrated as a symbol of the Amazon''s magic and mystery. These festivals often coincide with the flood season, when the river is at its highest point.', 'en'),
('469a5328-c430-459e-b3cd-6634b439ffcf', 'city-of-dreams', 'This story draws on several elements of Japanese urban folklore and cultural concepts. The idea of hidden layers or dimensions within familiar spaces is common in Japanese folklore, where the boundary between the mundane world and supernatural realms is often portrayed as permeable.\n\nThe story references Edo, the former name of Tokyo before it became Japan''s capital in 1868. Edo was known for its extensive canal system and garden landscapes, much of which was transformed during Tokyo''s rapid modernization.\n\nThe concept of ma (間) – the meaningful space or interval between things – is subtly present in the story. In Japanese aesthetics, ma refers not just to physical space but to the pause or emptiness that gives form to the whole. The \"dream Tokyo\" exists in the ma between midnight and dawn.\n\nThe story also touches on the Japanese concept of honne and tatemae – the contrast between one''s true feelings (honne) and the face one presents to the world (tatemae). Kenji''s discovery of dream Tokyo represents his reconnection with his authentic self beneath the salaryman exterior.\n\nThe elderly man in the indigo jacket represents the wisdom of tradition, while the floating lanterns and impossible tea are elements of the fantastical that often appear in Japanese folklore when boundaries between worlds thin.', 'en'),
('1e11b912-dec2-4b05-8921-f796f7af1430', 'tell-tale-heart', 'Written during a time of growing interest in psychology and the human mind. Poe pioneered psychological horror and explored the darker aspects of human consciousness.', 'en'),
('7e08e2db-f979-4db6-ba0d-2221271639fc', 'gift-of-the-magi', 'Written during the Gilded Age when economic inequality was stark. The story celebrates the value of emotional wealth over material possessions.', 'en'),
('203c506a-716a-45e8-a7ea-11b6aa786fa5', 'legend-of-sleepy-hollow', 'Written when America was establishing its cultural identity separate from Europe. Irving incorporated Dutch-American folklore to create distinctly American literature.', 'en'),
('18b74b9f-e1c9-455e-bd7e-96beab6354b3', 'rip-van-winkle', 'Written during a period when America was rapidly changing and establishing its national identity. The story explores the tension between colonial past and republican future.', 'en'),
('6b48440a-7f06-4f30-967f-d59c1042add0', 'yellow-wallpaper', 'Written as a critique of the \"rest cure\" prescribed to women with \"nervous disorders.\" Gilman herself was prescribed this treatment and wrote the story to highlight its harmful effects.', 'en'),
('b2242783-2883-46a1-acdd-e0cbc47787ea', 'the-birthmark', 'Written during a time of rapid scientific advancement and growing faith in human ability to control nature. Hawthorne questions this hubris and explores the dangers of pursuing perfection.', 'en'),
('8f9172bb-8c6f-4b99-b846-af767ce377a1', 'to-build-a-fire', 'Written during a time of frontier exploration and the myth of man''s dominion over nature. London, who had firsthand experience in the Klondike, portrays nature as indifferent to human concerns.', 'en'),
('cefb9e62-a3da-47f2-a2e0-4dad62d036ca', 'most-dangerous-game', 'Written in the aftermath of World War I, which raised questions about human savagery and the thin veneer of civilization. Also reflects colonial-era attitudes about \"civilized\" vs. \"primitive\" behavior.', 'en'),
('bc60b4cf-c2b1-4f65-a350-b5153420c6e2', 'monkeys-paw', 'Written during a time of British colonial expansion and fascination with \"exotic\" artifacts from other cultures. Also reflects Victorian/Edwardian interest in the supernatural and cautionary tales.', 'en'),
('306e7ba0-87bf-4519-b436-f7807f6da38b', 'mr-elvesham', 'Written during a period of rapid scientific advancement and growing concerns about the ethical implications of new technologies. Wells explores the dark potential of scientific progress.', 'en'),
('53db6a87-6cbf-4b9f-91bd-ee5ad48424b3', 'open-window', 'Written during the twilight of Edwardian England, the story satirizes upper-class country house culture and social conventions.', 'en'),
('375cea2c-43d4-4add-b06e-8c1b0b67c949', 'signal-man', 'Written during the rapid expansion of railways in Britain, which brought both progress and new dangers. Dickens himself had survived a serious train accident in 1865, which may have influenced this story.', 'en'),
('7b9ad153-4bfa-441c-acb5-b73d46319669', 'lady-with-dog', 'Written during a period of social transition in Russia, the story explores the constraints of conventional marriage and the search for authentic connection in a society bound by rigid expectations.', 'en'),
('6429c0d3-727b-4d5d-9a22-94a80f0b55f4', 'the-nose', 'Written as a satire of Russian bureaucracy and social climbing during the reign of Nicholas I, when rank and status were obsessively important.', 'en'),
('87da9512-9c73-4542-866a-95b270e376c0', 'queen-of-spades', 'Written during a time when gambling was a popular pastime among Russian aristocracy and military officers. The story explores themes of risk, chance, and the human desire to control fate.', 'en'),
('236a6eb4-a64c-41cc-8aac-892d377385de', 'the-overcoat', 'Written as a critique of the dehumanizing Russian bureaucracy and class system, where a person''s worth was determined by their rank and appearance.', 'en'),
('dafa4af4-a6f8-484a-8934-c3c7e3f7eb56', 'the-necklace', 'Written during the Belle Époque period in France, when class distinctions were rigid and social climbing was a common aspiration.', 'en'),
('1760d140-19d2-4e33-a1ec-4be45839f6d3', 'ball-of-fat', 'Written in the aftermath of France''s humiliating defeat in the Franco-Prussian War, the story critiques French society''s moral bankruptcy and hypocrisy.', 'en'),
('b2c84be8-0489-4f35-b7ff-2dd7a27dc159', 'last-lesson', 'Written shortly after France''s loss of Alsace-Lorraine to Germany, the story reflects the trauma of this territorial and cultural loss to the French national identity.', 'en'),
('f5dbb40e-4c01-418f-a8fb-776dd1a3aa6c', 'hunger-artist', 'Written as traditional entertainment forms were being replaced by new media and as artistic movements were rapidly evolving. Reflects anxieties about the artist''s place in modern society.', 'en'),
('dd7487a5-dc20-46db-bb36-83d14fec92d3', 'metamorphosis', 'Written on the eve of World War I, during a period of rapid industrialization and social change that was transforming traditional family structures and work relationships.', 'en'),
('5faeee5b-c894-455b-af9f-2f1329cbc61f', 'in-a-grove', 'Written during Japan''s rapid modernization in the early 20th century, the story questions objective truth and traditional values during a time of cultural transformation.', 'en'),
('56894e2e-57c3-4e62-8cb6-c0d8e87f6874', 'rashomon', 'Written as Japan was transitioning from a feudal society to a modern nation, the story explores the breakdown of moral codes during times of crisis.', 'en'),
('06c61fe6-34e5-4a7b-88d6-e90bfb79f4c0', 'true-story-of-ah-q', 'Written during China''s tumultuous transition from imperial rule to republic, the story critiques the Chinese national character and the failure of the 1911 Revolution to bring meaningful change to ordinary people.', 'en'),
('68c4ed26-0a9f-4289-b656-2a64b726eaa6', 'arabian-nights-selected', 'Compiled during the Islamic Golden Age, these tales reflect the cosmopolitan nature of the medieval Islamic world, incorporating elements from Persian, Arabic, Indian, Egyptian, and Mesopotamian cultures.', 'en'),
('02980ee1-7c41-4235-921e-a07fd95ad523', 'sun-moon-sky', 'Part of the rich tradition of African explanatory tales that use anthropomorphism to explain natural phenomena and teach social values.', 'en');

-- Insert images
INSERT INTO images (id, story_id, image_url, image_type, alt_text, attribution) VALUES
('91f36342-33da-44fb-98b4-8d2963adf5d5', 'mountain-secret', 'https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80', 'cover', 'Cover image for The Mountain''s Secret', 'Unsplash'),
('e78826ef-8989-4732-8b61-aa417b0d2ff1', 'river-spirits', 'https://images.unsplash.com/photo-1598880513756-c8913260e471?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80', 'cover', 'Cover image for River Spirits', 'Unsplash'),
('fe669890-06bd-4b3e-b4ad-ae1da2c2079a', 'city-of-dreams', 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80', 'cover', 'Cover image for City of Dreams', 'Unsplash'),
('f0910e49-cd33-4f4e-8843-0f1d9451629e', 'tell-tale-heart', 'https://images.unsplash.com/photo-1509557965875-b88c97052f43?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', 'cover', 'Cover image for The Tell-Tale Heart', 'Unsplash'),
('0a7fff31-48c2-4cd5-8270-9d12764d6a00', 'gift-of-the-magi', 'https://images.unsplash.com/photo-1512909006721-3d6018887383?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', 'cover', 'Cover image for The Gift of the Magi', 'Unsplash'),
('baa53fbb-68bb-4f46-a727-e90723563a14', 'legend-of-sleepy-hollow', 'https://images.unsplash.com/photo-1508165821229-7be2a6934be5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', 'cover', 'Cover image for The Legend of Sleepy Hollow', 'Unsplash'),
('5d4e3625-2495-409c-9fe7-7c2b2811214b', 'rip-van-winkle', 'https://images.unsplash.com/photo-1516939884455-1445c8652f83?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', 'cover', 'Cover image for Rip Van Winkle', 'Unsplash'),
('369a5a92-ada1-4c88-9cfa-a4e07240b767', 'yellow-wallpaper', 'https://images.unsplash.com/photo-1585314062604-1a357de8b000?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80', 'cover', 'Cover image for The Yellow Wallpaper', 'Unsplash'),
('39a326b8-5625-496a-b4ee-6b45b39a5a89', 'the-birthmark', 'https://images.unsplash.com/photo-1584278860047-22db9ff82bed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', 'cover', 'Cover image for The Birthmark', 'Unsplash'),
('6d74c0cd-92c5-4f4f-ad6e-904049425c91', 'to-build-a-fire', 'https://images.unsplash.com/photo-1483982258113-b72862e6cff6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', 'cover', 'Cover image for To Build a Fire', 'Unsplash'),
('301237e4-ed46-452b-8312-f8cb2d8c719d', 'most-dangerous-game', 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1141&q=80', 'cover', 'Cover image for The Most Dangerous Game', 'Unsplash'),
('7c9d00f8-58c5-48cb-b177-04f9c26610c6', 'monkeys-paw', 'https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80', 'cover', 'Cover image for The Monkey''s Paw', 'Unsplash'),
('7a15bd44-b011-404a-ae74-6208f19b5295', 'mr-elvesham', 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', 'cover', 'Cover image for The Story of the Late Mr. Elvesham', 'Unsplash'),
('c1e81ae1-c862-42a3-bcf2-db3c52cdf597', 'open-window', 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', 'cover', 'Cover image for The Open Window', 'Unsplash'),
('0da2cbb0-561e-4d63-92bd-0498c554fae5', 'signal-man', 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1184&q=80', 'cover', 'Cover image for The Signal-Man', 'Unsplash'),
('d3bff195-0912-49e3-bf5b-9d59768465f7', 'lady-with-dog', 'https://images.unsplash.com/photo-1551524559-8af4e6624178?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1025&q=80', 'cover', 'Cover image for The Lady with the Dog', 'Unsplash'),
('97b227fd-f499-4217-a586-beb9d4bf9395', 'the-nose', 'https://images.unsplash.com/photo-1580893246395-52aead8960dc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80', 'cover', 'Cover image for The Nose', 'Unsplash'),
('e2ce9d82-989f-4272-ac3e-b585154b3b3f', 'queen-of-spades', 'https://images.unsplash.com/photo-1541278107931-e006523892df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80', 'cover', 'Cover image for The Queen of Spades', 'Unsplash'),
('ab22f9de-8c17-45b4-a835-5b0d398790b0', 'the-overcoat', 'https://images.unsplash.com/photo-1551031761-29fc9b91a596?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', 'cover', 'Cover image for The Overcoat', 'Unsplash'),
('54e3f3be-1adc-4165-a430-7b5d3a8daf20', 'the-necklace', 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', 'cover', 'Cover image for The Necklace', 'Unsplash'),
('5379fb3c-6bb5-4407-b50b-974f13c82210', 'ball-of-fat', 'https://images.unsplash.com/photo-1504197832061-98356e3dcdcd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', 'cover', 'Cover image for Ball of Fat', 'Unsplash'),
('31e4e1ce-a530-44ed-88d6-e980549ac169', 'last-lesson', 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1122&q=80', 'cover', 'Cover image for The Last Lesson', 'Unsplash'),
('0530d43c-1cb2-4d92-bfc1-28992bfbe186', 'hunger-artist', 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80', 'cover', 'Cover image for A Hunger Artist', 'Unsplash'),
('3d0cbe56-229b-426e-a546-edced77d064f', 'metamorphosis', 'https://images.unsplash.com/photo-1634401802733-9b474eda0b92?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', 'cover', 'Cover image for The Metamorphosis', 'Unsplash'),
('18c21c36-ffc8-4b91-9b1e-0b099feabea6', 'in-a-grove', 'https://images.unsplash.com/photo-1528164344705-47542687000d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80', 'cover', 'Cover image for In a Grove', 'Unsplash'),
('05de5eab-07c6-4867-b822-d0a477adddb4', 'rashomon', 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', 'cover', 'Cover image for Rashomon', 'Unsplash'),
('6257bc69-c412-45cf-bbcf-a8084a2662ee', 'true-story-of-ah-q', 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', 'cover', 'Cover image for The True Story of Ah Q', 'Unsplash'),
('fd2df9bc-0410-4f34-872f-b42a61e1b066', 'arabian-nights-selected', 'https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80', 'cover', 'Cover image for The Arabian Nights (Selected Tales)', 'Unsplash'),
('b5c10df2-146f-4c91-8252-c783ef1ff546', 'sun-moon-sky', 'https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1194&q=80', 'cover', 'Cover image for Why the Sun and the Moon Live in the Sky', 'Unsplash');

