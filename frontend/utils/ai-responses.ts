export const generateAIResponse = (userMessage: string): string => {
  const responses = {
    placement:
      "For placement preparation, focus on: 1) Data Structures & Algorithms 2) System Design 3) Resume building 4) Mock interviews. I recommend practicing on LeetCode and preparing behavioral questions.",
    internship:
      "For internships, maintain a good CGPA (7.0+), build projects, contribute to open source, and apply early. Many companies start hiring 6 months in advance.",
    project:
      "Great project ideas include: 1) E-commerce website 2) Chat application 3) Task management system 4) Weather app 5) Portfolio website. Choose based on your interests and skills.",
    coding:
      "To improve coding skills: 1) Practice daily on coding platforms 2) Participate in contests 3) Learn new algorithms 4) Build projects 5) Contribute to open source.",
    default:
      "I can help you with academic queries, placement guidance, project ideas, coding tips, and campus information. What specific topic would you like to know about?",
  }

  const message = userMessage.toLowerCase()
  if (message.includes("placement") || message.includes("interview")) return responses.placement
  if (message.includes("internship")) return responses.internship
  if (message.includes("project")) return responses.project
  if (message.includes("coding") || message.includes("algorithm")) return responses.coding
  return responses.default
}
