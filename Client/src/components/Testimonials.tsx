import React from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Testimonials = () => {
  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container space-y-12 px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                What Our Customers Say
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Hear from our satisfied customers about their experiences with
                our book selection and service.
              </p>
            </div>
          </div>
          <div className="overflow-hidden grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div>
              <Card className="p-6 bg-gray-50 dark:bg-gray-800 h-64">
                <div className="flex items-start gap-6">
                  <Avatar>
                    <AvatarFallback>JB</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <div className="space-y-1">
                      <h4 className="text-lg font-semibold">Javed Bukhari</h4>
                      <div className="flex items-center gap-0.5">
                        <StarIcon className="w-4 h-4 fill-primary" />
                        <StarIcon className="w-4 h-4 fill-primary" />
                        <StarIcon className="w-4 h-4 fill-primary" />
                        <StarIcon className="w-4 h-4 fill-primary" />
                        <StarIcon className="w-4 h-4 fill-primary" />
                      </div>
                    </div>
                    <blockquote className="text-lg leading-relaxed">
                      I've been a loyal customer of Bookshelf for a long time,
                      and their extensive collection never fails to amaze me.
                      From classic novels to the latest bestsellers, they have
                      it all!
                    </blockquote>
                  </div>
                </div>
              </Card>
            </div>
            <div>
              <Card className="p-6 bg-gray-50 dark:bg-gray-800 h-64">
                <div className="flex items-start gap-6">
                  <Avatar>
                    <AvatarFallback>SA</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <div className="space-y-1">
                      <h4 className="text-lg font-semibold">Sana Aalam</h4>
                      <div className="flex items-center gap-0.5">
                        <StarIcon className="w-4 h-4 fill-primary" />
                        <StarIcon className="w-4 h-4 fill-primary" />
                        <StarIcon className="w-4 h-4 fill-primary" />
                        <StarIcon className="w-4 h-4 fill-primary" />
                        <StarIcon className="w-4 h-4 fill-primary" />
                      </div>
                    </div>
                    <blockquote className="text-lg leading-relaxed">
                      As an avid reader, I can't say enough good things about
                      Bookshelf. Their selection is unparalleled, covering a
                      wide range of genres and authors!
                    </blockquote>
                  </div>
                </div>
              </Card>
            </div>
            <div>
              <Card className="p-6 bg-gray-50 dark:bg-gray-800 h-64">
                <div className="flex items-start gap-6">
                  <Avatar>
                    <AvatarFallback>AS</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <div className="space-y-1">
                      <h4 className="text-lg font-semibold">Ali Shiraz</h4>
                      <div className="flex items-center gap-0.5">
                        <StarIcon className="w-4 h-4 fill-primary" />
                        <StarIcon className="w-4 h-4 fill-primary" />
                        <StarIcon className="w-4 h-4 fill-primary" />
                        <StarIcon className="w-4 h-4 fill-primary" />
                        <StarIcon className="w-4 h-4 fill-primary" />
                      </div>
                    </div>
                    <blockquote className="text-lg leading-relaxed">
                      I've been a customer of Bookshelf for years and I'm always
                      impressed by their wide selection and fast shipping.
                      Highly recommended!
                    </blockquote>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Testimonials;

function StarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
