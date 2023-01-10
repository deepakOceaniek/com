import React from "react";
import { Box, Stack } from "@chakra-ui/react";
import Card from "./Card";
import axios from "axios";

const Home = () => {
  const checkoutHandler = async (amount) => {
    const {
      data: { key },
    } = await axios.get("/api/v1/getkey");

    const {
      data: { order },
    } = await axios.post("/api/v1/checkout", {
      amount,
    });
    console.log(order.id);

    const options = {
      key,
      amount: order.amount,
      currency: "INR",
      name: "Madipros",
      description: "RazorPay",
      // image: "https://avatars.githubusercontent.com/u/25058652?",
      order_id: order.id,
      // callback_url: "/api/v1/paymentverification",
      handler: function (response) {
        console.log(response);

        const resp = fetch("/api/v1/order/new", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ordersBy: "Lab",
            totalPrice: 1240,
            totalSaving: 0,
            shippingFee: 0,
            amountToBePaid: 1240,
            orderItems: [
              {
                product: "63a33af6086f320d1ba636c8",
                image: "sample Image",
                quantity: 2,
              },
            ],
            user: "63a9c8e30db64c6632e79dbb",
            paymentInfo: {
              id: "sample paymentInfo",
              status: "succeeded",
            },
          }),
        });

        const data = resp.JSON();
        console.log(data);
      },
      prefill: {
        name: "Deepak Singh",
        email: "Deepak@oceaniek.com",
        contact: "7986614157",
      },
      notes: [
        {
          address: "Razorpay Corporate Office",
        },
      ],
      theme: {
        color: "#121212",
      },
    };
    const razor = new window.Razorpay(options);
    razor.open();
  };

  return (
    <Box>
      <Stack
        h={"100vh"}
        alignItems="center"
        justifyContent="center"
        direction={["column", "row"]}
      >
        <Card
          amount={5000}
          img={
            "https://cdn.shopify.com/s/files/1/1684/4603/products/MacBookPro13_Mid2012_NonRetina_Silver.png"
          }
          checkoutHandler={checkoutHandler}
        />
        <Card
          amount={3000}
          img={
            "http://i1.adis.ws/i/canon/eos-r5_front_rf24-105mmf4lisusm_32c26ad194234d42b3cd9e582a21c99b"
          }
          checkoutHandler={checkoutHandler}
        />
      </Stack>
    </Box>
  );
};

export default Home;
