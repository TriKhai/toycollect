import React from "react";
import { Input } from "./Input";
import { Review } from "./Review";

export default function ReviewForm() {
  return (
    <div className="w-[42rem] p-16 bg-white rounded-3xl">
      <h1 className="text-2xl font-black mb-2">Overall Rating</h1>

      <div className="mb-3">
        <div><Review /></div>
        <p className="text-sm">Click to rate</p>
      </div>

      <Input
        title="Review title"
        placeholder="Example: Easy to use"
        type="text"
      />

      <p>Would you recommend this product to a friend?</p>
      <div className="flex gap-4 mb-2">
        <div>
          <input
            className="mr-2 scale-150 accent-black"
            name="product"
            type="radio"
            id="yes"
            value="yes"
          />
          <label htmlFor="yes">Yes</label>
        </div>
        <div>
          <input
            className="mr-2 scale-150 accent-black"
            name="product"
            type="radio"
            id="no"
            value="no"
          />
          <label htmlFor="no">No</label>
        </div>
      </div>

      <Input
        title="Product review"
        placeholder="Example: Easy to use"
        type="textarea"
      />

      <div className="flex gap-x-3 mb-2">
        <div className="grow">
          <Input
            title="Nickname"
            placeholder="Example: khaipro123"
            type="text"
          />
        </div>
        <div className="grow">
          <Input
            title="Email address (will not be published)"
            placeholder="Example: trikhaikhmt@gmail.com"
            type="text"
          />
        </div>
      </div>

      <div className="mb-2">
        <input
          className="mr-2 scale-150 accent-black"
          name="accept"
          type="radio"
          id="accept"
          value="accept"
        />
        <label htmlFor="accept">I accept the terms and conditions</label>
      </div>

      <p className="text-sm mb-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, neque in.
        Iste itaque dicta illo sequi consectetur est eum totam dignissimos ullam
        veritatis, explicabo consequatur nostrum voluptatum dolor eos mollitia!
      </p>

      <button className="hover:bg-green-400 font-bold hover:text-black w-full rounded-md bg-black text-white p-4">
        Submit product review
      </button>
    </div>
  );
}
