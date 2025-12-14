// utils/mockData.ts

export const generateMockUsers = (count: number = 1000) => {
  const firstNames = ['John', 'Jane', 'Alex', 'Sarah', 'Michael', 'Emily', 'David', 'Lisa', 'James', 'Anna', 'Robert', 'Maria', 'William', 'Emma', 'Richard'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson'];
  
  return Array.from({ length: count }, (_, i) => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const randomDays = Math.floor(Math.random() * 365);
    
    return {
      id: `user-${i + 1}`,
      name: `${firstName} ${lastName}`,
      email: `${firstName?.toLowerCase()}.${lastName?.toLowerCase()}${i}@mail.com`,
      createdAt: new Date(2025, 0, 1 + randomDays).toISOString(),
    };
  });
}

export const generateMockPosts = (count: number = 5000, userIds: string[]) => {
  const titles = [
    'Getting Started with React',
    'Advanced TypeScript Tips',
    'Building Scalable Applications',
    'Web Performance Optimization',
    'Design Patterns in JavaScript',
    'Testing Best Practices',
    'CI/CD Pipeline Setup',
    'Database Design Principles',
    'API Development Guide',
    'Frontend Architecture',
    'State Management Solutions',
    'Authentication Strategies',
    'Microservices Overview',
    'GraphQL vs REST',
    'Docker Fundamentals',
  ];

  const contentTemplates = [
    'This is a comprehensive guide about {topic}. It covers everything you need to know to get started and become proficient.',
    'In this article, we explore {topic} in detail. Learn the best practices and common pitfalls to avoid.',
    'A deep dive into {topic}. Discover advanced techniques and real-world examples.',
    'Everything you need to know about {topic}. From basics to advanced concepts.',
    'Master {topic} with this step-by-step tutorial. Includes code examples and explanations.',
  ];

  return Array.from({ length: count }, (_, i) => {
    const title = titles[Math.floor(Math.random() * titles.length)];
    const contentTemplate = contentTemplates[Math.floor(Math.random() * contentTemplates.length)];
    const content = contentTemplate?.replace('{topic}', title!.toLowerCase());
    const randomDays = Math.floor(Math.random() * 365);
    const userId = userIds[Math.floor(Math.random() * userIds.length)];
    
    return {
      id: `post-${i + 1}`,
      title: `${title} - Part ${i + 1}`,
      content,
      published: Math.random() > 0.3, // 70% published
      authorId: userId,
      createdAt: new Date(2025, 0, 1 + randomDays).toISOString(),
    };
  });
}