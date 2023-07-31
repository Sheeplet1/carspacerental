"use client";

import LoginSideBar from "@components/LoginSideBar";
import { useUser } from "@contexts/UserProvider";
import { AuthRequiredError } from "@errors/exceptions";
import { Card } from "flowbite-react";

const Inbox = () => {
  const { user } = useUser();

  if (!user) {
    throw new AuthRequiredError();
  }

  return (
    <div className="flex flex-row w-full mt-12">
      <div className="rounded-lg p-5">
        <LoginSideBar />
      </div>
      <div
        className="flex flex-col w-full justify-between ml-5 p-5 bg-white shadow-md rounded-lg"
        style={{ height: "70vh" }}
      >
        <div className="flex flex-col w-full">
          <div className="flex flex-row justify-between w-full mb-5">
            <h1 className="heading_text text-3xl text-gray-700">Inbox</h1>
          </div>
          {user.inbox.length > 0 ? (
            user.inbox.map((message) => (
              <Card key={message._id} className="mb-4">
                <Card.Header>{message.subject}</Card.Header>
                <Card.Body>
                  <p>
                    <strong>Sender:</strong> {message.sender}
                  </p>
                  <p>
                    <strong>Message:</strong> {message.body}
                  </p>
                  <p>
                    <strong>Time:</strong>{" "}
                    {new Date(message.timestamp).toLocaleString()}
                  </p>
                </Card.Body>
              </Card>
            ))
          ) : (
            <div className="text-xl text-gray-500">
              No messages in your inbox
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Inbox;
