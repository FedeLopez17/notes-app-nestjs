-- Delete existing data first to avoid duplicates
DELETE FROM "_NoteCategories";
DELETE FROM "Note";
DELETE FROM "Category";

-- Insert some categories
INSERT INTO "Category" (id, title) VALUES 
  (1, 'Work'),
  (2, 'Personal'),
  (3, 'Health'),
  (4, 'Ideas'),
  (5, 'Finance'),
  (6, 'Travel'),
  (7, 'Learning'),
  (8, 'Entertainment');

-- Insert realistic notes
INSERT INTO "Note" (id, title, content, "createdAt", "updatedAt") VALUES 
  (1, 'Meeting Notes', 'Discuss project roadmap and deadlines.', NOW(), NOW()),
  (2, 'Grocery List', 'Milk, eggs, bread, chicken, and coffee.', NOW(), NOW()),
  (3, 'Workout Plan', 'Monday: Chest & Triceps, Tuesday: Back & Biceps.', NOW(), NOW()),
  (4, 'App Idea', 'A mobile app that helps track daily habits and goals.', NOW(), NOW()),
  (5, 'Budget Review', 'Check monthly expenses and savings plan.', NOW(), NOW()),
  (6, 'Flight Booking', 'Compare flight prices for the upcoming trip.', NOW(), NOW()),
  (7, 'Learn TypeScript', 'Complete TypeScript fundamentals and start a mini-project.', NOW(), NOW()),
  (8, 'Weekend Movie List', 'Watch Inception, Interstellar, and The Social Network.', NOW(), NOW()),
  (9, 'Team Feedback', 'Gather feedback on recent project improvements.', NOW(), NOW()),
  (10, 'Car Maintenance', 'Oil change, tire rotation, and general inspection.', NOW(), NOW()),
  (11, 'Morning Routine', 'Wake up at 6 AM, meditate, and have a healthy breakfast.', NOW(), NOW()),
  (12, 'Startup Pitch', 'Prepare slides for investor meeting on Friday.', NOW(), NOW()),
  (13, 'Stock Market Analysis', 'Check trends for Tesla, Apple, and Google.', NOW(), NOW()),
  (14, 'Packing List', 'Passport, chargers, camera, and travel essentials.', NOW(), NOW()),
  (15, 'React Best Practices', 'Study performance optimization techniques.', NOW(), NOW()),
  (16, 'Concert Tickets', 'Buy tickets for The Weeknd’s concert next month.', NOW(), NOW());

  -- Associate notes with categories
INSERT INTO "_NoteCategories" ("A", "B") VALUES
  (1, 1),  -- Meeting Notes → Work
  (2, 2),  -- Grocery List → Personal
  (3, 3),  -- Workout Plan → Health
  (4, 4),  -- App Idea → Ideas
  (5, 5),  -- Budget Review → Finance
  (6, 6),  -- Flight Booking → Travel
  (7, 7),  -- Learn TypeScript → Learning
  (8, 8),  -- Weekend Movie List → Entertainment
  (1, 9),  -- Team Feedback → Work
  (2, 10), -- Car Maintenance → Personal
  (3, 11), -- Morning Routine → Health
  (4, 12), -- Startup Pitch → Ideas
  (5, 13), -- Stock Market Analysis → Finance
  (6, 14), -- Packing List → Travel
  (7, 15), -- React Best Practices → Learning
  (8, 16); -- Concert Tickets → Entertainment
