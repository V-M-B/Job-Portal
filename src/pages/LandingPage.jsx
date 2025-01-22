import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import companies from "../data/companies.json";
import Autoplay from "embla-carousel-autoplay"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import faq from "../data/faq.json"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


export default function LandingPage() {
  return (
    <main className="flex flex-col sm:gap-20 py-10 sm:py-20">
      <section className="text-center">
        <h1 className="flex flex-col items-center justify-center gradient-title text-4xl font-extrabold sm:text-6xl lg:text-8xl tracking-tighter py-4">
          Find Your Dream Job
          <span className="flex items-center gap-2 sm:gap-6">
            and get{" "}
            <img
              src="./logo.png"
              alt="hirrd-logo"
              className="h-14 sm:h-24 lg:h-32"
            />
          </span>
        </h1>
        <p className="text-gray-300 sm:mt-4 text-xs sm:text-xl">
          Explore a wide range of job opportunities and find your dream job.
          Apply now and start your career journey with us.
        </p>
      </section>
      <div className="flex gap-6 justify-center">
        {/* buttons */}
        <Link to="/job">
          <Button variant="blue" size="xl">
            Find Jobs
          </Button>
        </Link>
        <Link to="/postjob">
          <Button variant="destructive" size="xl">
            Post a Job
          </Button>
        </Link>
      </div>

      {/* Carousel */}
      <Carousel
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        className="w-full py-10"
      >
        <CarouselContent className="flex gap-5 sm:gap-20 items-center">
          {companies.map(({ name, id, path }) => (
            <CarouselItem key={id} className="basis-1/3 lg:basis-1/6 ">
              <img
                src={path}
                alt={name}
                className="h-9 sm:h-14 object-contain"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <img src="/banner.jpeg" className="w-full" />

      {/* Banner */}

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* cards  1*/}
        <Card>
  <CardHeader >
    <CardTitle>For Job Seekers</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Search and apply for jobs, track application status, and receive personalized job recommendations.</p>
  </CardContent>
</Card>

        {/* cards */}
        <Card>
  <CardHeader >
    <CardTitle>For Employers</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Post jobs, manage applications, and track job progress.</p>
  </CardContent>
</Card>

        {/* cards 3*/}
        <Card>
  <CardHeader >
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card Description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card Content</p>
  </CardContent>
  <CardFooter>
    <p>Card Footer</p>
  </CardFooter>
</Card>

        </section>
      {/* Accordian */}
      <Accordion type="single" collapsible>
        {faq.map((faq,index)=>{
          return(
              <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          );
        })}

</Accordion>

    </main>
  );
}
