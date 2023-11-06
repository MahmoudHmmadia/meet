export type auth = {
  userDetails: {
    name: string;
    email: string;
    age: number;
    numberOfCalls: number;
    password: string;
    imageName: string;
    messages: message[];
    id: string;
    plan: string;
    role: string;
    meetId: string;
    meetCode: string;
  };
  token: string;
};
export type message = {
  sendAt: string;
  content: string;
};
