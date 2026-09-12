import { api } from "./index";
import type { ApiResponse, AssessmentsResponse, GetAssessmentsParams } from "@/types";

interface SendAssessmentEmailData {
  recipientEmail: string;
  userName?: string;
  assessmentName: 'Money Personality' | 'Financial Health Check' | 'Risk Profile';
  assessmentDescription?: string;
  resultsSummary?: React.ReactNode | string;
}

interface SendAssessmentEmailResponse {
  success: boolean;
  message: string;
  messageId: string;
}

export const emailApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Send assessment results email
    sendAssessmentResultsEmail: builder.mutation<
      SendAssessmentEmailResponse,
      SendAssessmentEmailData
    >({
      query: (data) => ({
        url: "/email/assessment-results",
        method: "POST",
        body: data,
      }),
    }),

    // Test email configuration
    testEmail: builder.mutation<
      SendAssessmentEmailResponse,
      { email: string }
    >({
      query: (data) => ({
        url: "/email/test",
        method: "POST",
        body: data,
      }),
    }),

    // Send newsletter email
    sendNewsletterEmail: builder.mutation<
      SendAssessmentEmailResponse,
      any
    >({
      query: (data) => ({
        url: "/email/newsletter",
        method: "POST",
        body: data,
      }),
    }),

    // Send custom message
    sendMessageEmail: builder.mutation<
      SendAssessmentEmailResponse,
      any
    >({
      query: (data) => ({
        url: "/email/send-message",
        method: "POST",
        body: data,
      }),
    }),

     // Get all assessments (admin)
    getAssessments: builder.query<
      ApiResponse<AssessmentsResponse>,
      GetAssessmentsParams
    >({
      query: (params) => {
        const searchParams = new URLSearchParams();
        if (params.quiz_type && params.quiz_type !== 'all') {
          searchParams.set('quiz_type', params.quiz_type);
        }
        if (params.search) searchParams.set('search', params.search);
        if (params.page) searchParams.set('page', params.page.toString());
        if (params.limit) searchParams.set('limit', params.limit.toString());
        return `/email/assessments?${searchParams.toString()}`;
      },
      providesTags: (result) =>
        result?.data?.data
          ? [
              ...result.data.data.map(({ id }) => ({
                type: 'Assessments' as const,
                id,
              })),
              { type: 'Assessments', id: 'LIST' },
            ]
          : [{ type: 'Assessments', id: 'LIST' }],
    }),
  }),
});

export const {
  useSendAssessmentResultsEmailMutation,
  useTestEmailMutation,
  useSendNewsletterEmailMutation,
  useSendMessageEmailMutation,
  useGetAssessmentsQuery,
} = emailApi;
