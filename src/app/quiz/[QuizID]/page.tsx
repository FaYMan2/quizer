import prisma from "@/utils/prisma";
import { currentUser } from "@clerk/nextjs/server";
import QuizClient from "./Quiz-Client";
import { QuizJSON } from "./Quiz-Client";

export default async function quiz({ params }: { params: { QuizID: string } }) {
  const user: any | null = await currentUser();
  console.log(`from quiz page route ${params.QuizID}`);
  const q = await prisma.quiz.findFirst({
    where: {
      QuizID: params.QuizID,
      userId: user?.id,
    },
  });

  if (!q) {
    return <div> quiz data not found </div>;
  }
  const QuizData = q.QuizData as unknown;
  return <QuizClient QuizData={QuizData as QuizJSON} QuizId={q.QuizID} />;
}
