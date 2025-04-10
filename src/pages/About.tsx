import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[400px] bg-gray-900">
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white"
          >
            <h1 className="text-4xl font-serif mb-4">About ARTLAB</h1>
            <p className="text-xl">Crafting Excellence in Furniture Design</p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-3xl font-serif mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Founded in 2010, ARTLAB has been at the forefront of furniture design and craftsmanship. 
                What started as a small workshop has grown into a renowned brand known for its commitment 
                to quality and innovation.
              </p>
              <p className="text-gray-600">
                Our journey began with a simple mission: to create furniture that combines aesthetic 
                beauty with functional design. Today, we continue to uphold this mission while embracing 
                sustainable practices and modern technology.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="relative h-[400px]"
            >
              <img
                src="/images/workshop.jpg"
                alt="Our Workshop"
                className="w-full h-full object-cover rounded-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif text-center mb-12">Our Mission & Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="h-16 w-16 mx-auto mb-4">
                <img src="/images/quality-icon.png" alt="Quality" className="h-full w-full object-contain" />
              </div>
              <h3 className="text-xl font-medium mb-2">Quality Craftsmanship</h3>
              <p className="text-gray-600">
                We believe in creating furniture that stands the test of time through meticulous 
                attention to detail and superior craftsmanship.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <div className="h-16 w-16 mx-auto mb-4">
                <img src="/images/sustainability-icon.png" alt="Sustainability" className="h-full w-full object-contain" />
              </div>
              <h3 className="text-xl font-medium mb-2">Sustainable Design</h3>
              <p className="text-gray-600">
                Our commitment to sustainability drives us to use eco-friendly materials and 
                responsible manufacturing processes.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-center"
            >
              <div className="h-16 w-16 mx-auto mb-4">
                <img src="/images/innovation-icon.png" alt="Innovation" className="h-full w-full object-contain" />
              </div>
              <h3 className="text-xl font-medium mb-2">Innovation</h3>
              <p className="text-gray-600">
                We constantly push boundaries in design and functionality to create furniture 
                that meets the evolving needs of modern living.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="h-64 w-64 mx-auto mb-4 rounded-full overflow-hidden">
                <img src="/images/team-1.jpg" alt="Team Member" className="h-full w-full object-cover" />
              </div>
              <h3 className="text-xl font-medium mb-1">Sarah Johnson</h3>
              <p className="text-gray-600">Founder & Creative Director</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <div className="h-64 w-64 mx-auto mb-4 rounded-full overflow-hidden">
                <img src="/images/team-2.jpg" alt="Team Member" className="h-full w-full object-cover" />
              </div>
              <h3 className="text-xl font-medium mb-1">Michael Chen</h3>
              <p className="text-gray-600">Head of Design</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-center"
            >
              <div className="h-64 w-64 mx-auto mb-4 rounded-full overflow-hidden">
                <img src="/images/team-3.jpg" alt="Team Member" className="h-full w-full object-cover" />
              </div>
              <h3 className="text-xl font-medium mb-1">Emily Rodriguez</h3>
              <p className="text-gray-600">Production Manager</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-serif mb-4">Ready to Transform Your Space?</h2>
          <p className="text-xl mb-8">Let's create something beautiful together</p>
          <a
            href="/contact"
            className="inline-block px-8 py-3 bg-white text-gray-900 rounded-full hover:bg-gray-100 transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </div>
  );
};

export default About; 