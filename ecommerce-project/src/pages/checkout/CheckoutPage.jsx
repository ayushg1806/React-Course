import { useEffect, useState } from "react";
import { CheckoutHeader } from "./CheckoutHeader";
import { OrderSummary } from "./OrderSummary";
import { PaymentSummary } from "./PaymentSummary";
import axios from "axios";
import "./CheckoutPage.css";

export function CheckoutPage({ cart }) {
  useEffect(() => {
    document.title = "Checkout";

    const favicon = document.querySelector("link[rel='icon']");
    if (favicon) {
      favicon.href = "/images/cart-favicon.png";
    }
  }, []);

  const [deliveryOption, setDeliveryOption] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  useEffect(() => {
    axios
      .get("/api/delivery-options?expand=estimatedDeliveryTime")
      .then((response) => {
        setDeliveryOption(response.data);
      });

    axios.get("/api/payment-summary").then((response) => {
      setPaymentSummary(response.data);
    });
  }, []);

  return (
    <>
      <title>Checkout</title>

      <CheckoutHeader />

      <div className='checkout-page'>
        <div className='page-title'>Review your order</div>
        <div className='checkout-grid'>
          <OrderSummary cart={cart} deliveryOption={deliveryOption} />
          <PaymentSummary paymentSummary={paymentSummary} />
        </div>
      </div>
    </>
  );
}
