import React from "react";
import PageTitle from "../components/Typography/PageTitle";
import SectionTitle from "../components/Typography/SectionTitle";
import {
  Input,
  HelperText,
  Button,
  Label,
  Select,
  Textarea,
} from "@windmill/react-ui";

import { useState } from "react";

async function getApiData() {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/todos/"
  ).then((response) => response.json());
}

function Forms() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("http://localhost:4000/api/v1/create", {
      method: "POST",
      body: JSON.stringify({ title, amount, type, category }),
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("ResponseToken"),
      },
    });

    if (response.status === 201) {
      alert("registration successful");
    } else {
      alert("registration failed");
    }
  };

  return (
    <>
      <PageTitle>Create transaction</PageTitle>

      <form onSubmit={handleSubmit}>
        <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
          <Label
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          >
            <span>Title</span>
            <Input className="mt-1" placeholder="Title" />
          </Label>

          <Label
            className="mt-4"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          >
            <span>Amount</span>
            <Input className="mt-1" placeholder="0" />
          </Label>

          {/* <Label
            className="mt-4"
            value={type}
            onChange={(event) => setType(event.target.value)}
          >
            <span>Type</span>
            <Input disabled className="mt-1" placeholder="" />
          </Label> */}
          <Label
            className="mt-4"
            value={type}
            onChange={(event) => setType(event.target.value)}
          >
            <span>Type</span>
            <Select placeholder="Select" className="mt-1">
              <option>Expense</option>
              <option>Income</option>
            </Select>
          </Label>

          <Label
            className="mt-4"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <span>Category</span>
            <Select className="mt-1">
              <option>Food</option>
              <option>Rent</option>
              <option>Travel</option>
              <option>Health</option>
              <option>Luxury</option>
              <option>Others</option>
            </Select>
          </Label>

          {/* <Label className="mt-4">
            <span>Requested Limit</span>
            <Select className="mt-1">
              <option>$1,000</option>
              <option>$5,000</option>
              <option>$10,000</option>
              <option>$25,000</option>
            </Select>
          </Label> */}

          {/* <Label className="mt-4">
            <span>Multiselect</span>
            <Select className="mt-1" multiple>
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
              <option>Option 4</option>
              <option>Option 5</option>
            </Select>
          </Label> */}

          {/* <Label className="mt-4">
            <span>Message</span>
            <Textarea
              className="mt-1"
              rows="3"
              placeholder="Enter some long form content."
            />
          </Label> */}

          {/* <Label className="mt-6" check>
            <Input type="checkbox" />
            <span className="ml-2">
              I agree to the <span className="underline">privacy policy</span>
            </span>
          </Label> */}

          {/* <div className="mt-4">
            <Label>Account Type</Label>
            <div className="mt-2">
              <Label radio>
                <Input type="radio" value="personal" name="accountType" />
                <span className="ml-2">Personal</span>
              </Label>
              <Label className="ml-6" radio>
                <Input type="radio" value="business" name="accountType" />
                <span className="ml-2">Business</span>
              </Label>
              <Label disabled className="ml-6" radio>
                <Input
                  disabled
                  type="radio"
                  value="disabled"
                  name="accountType"
                />
                <span className="ml-2">Disabled</span>
              </Label>
            </div>
          </div> */}

          <Button className="mt-4" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </>
  );
}

export default Forms;
