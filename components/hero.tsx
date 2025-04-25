'use client'

import Image from "next/image"
import Link from "next/link"
import { Star, ArrowUpRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { motion } from "motion/react"

const fadeUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
}

export function HeroSection() {
    return (
        <motion.section
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.15 }}
            className="w-full max-w-6xl mx-auto bg-[#f8f6e9] rounded-3xl shadow-lg overflow-hidden my-8"
        >
            <div className="grid md:grid-cols-2 gap-8 p-6">
                {/* Left Side */}
                <motion.div variants={fadeUp} className="flex flex-col justify-center space-y-6">
                    <div className="flex items-center">
                        <div className="relative">
                            {/* Green circle lapping over the black badge */}
                            <span className="absolute -left-2 -top-1 z-10 w-8 h-8 rounded-full bg-green-400 "></span>
                            <span className="bg-black text-white text-xs px-5 py-2 rounded-full pl-4 ml-2">#2025</span>
                        </div>
                        <div className="w-6 h-6 flex items-center justify-center ml-2">
                            <Star className="w-4 h-4 text-black" fill="none" />
                        </div>
                    </div>

                    <p className="text-sm">
                        Renowned for her <span className="font-bold">vibrant</span> and{" "}
                        <span className="font-bold">daring</span> designs on the web, we launched Lumina to the house.
                    </p>

                    <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                        Curate Your
                        <br />
                        True Style
                    </h1>

                    <div className="pt-4">
                        <Link href="/products/categories/winter" className="inline-block">
                            <Button className="bg-black text-white hover:bg-gray-800 transition-transform duration-300 hover:scale-105">
                                Shop Collection
                            </Button>
                        </Link>
                    </div>

                    <div className="pt-8">
                        <motion.div
                            variants={fadeUp}
                            whileHover={{ scale: 1.02 }}
                            className="relative transition-transform"
                        >
                            <Image
                                src="/fashion-hero02.jpg?height=200&width=300"
                                alt="Reflective Running Jogging Jacket"
                                width={300}
                                height={200}
                                className="rounded-lg object-cover"
                            />
                            <div className="absolute -bottom-4 left-4 right-4 bg-white p-3 rounded-lg shadow transition-shadow">
                                <p className="font-medium text-sm">Reflective Running Jogging Jacket</p>
                                <div className="flex justify-between mt-1">
                                    <span className="font-bold">$350.00</span>
                                    <span className="text-gray-400 line-through text-sm">$400.00</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Right Side */}
                <motion.div variants={fadeUp} className="relative">
                    {/* Floating Icons */}
                    <motion.div
                        variants={fadeUp}
                        className="absolute top-0 right-0 z-10 flex items-center space-x-2"
                    >
                        <button className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center hover:scale-105 transition-transform">
                            <ArrowUpRight className="w-4 h-4" />
                        </button>
                        <div className="w-6 h-6 flex items-center justify-center">
                            <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
                        </div>
                    </motion.div>

                    {/* Main Image */}
                    <motion.div
                        variants={fadeUp}
                        className="relative h-[400px] rounded-lg overflow-hidden"
                        whileHover={{ scale: 1.01 }}
                    >
                        <Image
                            src="/fashion-hero03.jpg?height=400&width=400"
                            alt="Person in yellow jacket"
                            fill
                            className="object-cover transition-all duration-300"
                        />
                    </motion.div>

                    {/* Floating Labels */}
                    <motion.div
                        variants={fadeUp}
                        className="absolute top-1/4 right-4 bg-white p-3 rounded-lg shadow hover:shadow-lg transition-shadow"
                    >
                        <div className="text-3xl font-bold">60K</div>
                        <div className="text-sm">Happy Customer</div>
                    </motion.div>

                    <motion.div
                        variants={fadeUp}
                        className="absolute bottom-16  mb-32 right-4 bg-white p-3 rounded-lg max-w-[180px] shadow hover:shadow-lg transition-shadow"
                    >
                        <div className="flex items-center ">
                            <Star className="w-4 h-4 text-black" />
                            <span className="ml-2 text-sm font-medium">Explore our</span>
                        </div>
                        <p className="text-sm">brand-new & unworn items</p>
                    </motion.div>

                    {/* Newsletter Preview */}
                    <motion.div
                        variants={fadeUp}
                        className="absolute -bottom-4 mb-16 sm:mt-12 left-0 right-0 mx-auto max-w-[70%] bg-white rounded-2xl p-4 shadow hover:shadow-md transition-shadow"
                    >
                        <div className="flex flex-col gap-3">
                            {/* Top Row: Newsletter Tag and Avatars */}
                            <div className="flex justify-between items-center w-full">
                                <div className="bg-yellow-300 text-black text-sm font-medium px-4 py-2 rounded-full">
                                    Newsletter
                                </div>
                                <div className="flex -space-x-2">
                                    <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white"></div>
                                    <div className="w-10 h-10 rounded-full bg-gray-300 border-2 border-white"></div>
                                    <div className="w-10 h-10 rounded-full bg-gray-400 border-2 border-white"></div>
                                </div>
                            </div>

                            {/* Divider */}
                            <hr className="border-gray-100 my-2" />

                            {/* Bottom Row: Text and CTA Button */}
                            <div className="flex justify-between items-center w-full">
                                <p className="text-sm">
                                    Subscribe newsletter and get <br />
                                    30% off your first order
                                </p>
                                <button className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center hover:scale-105 transition-transform">
                                    <ArrowUpRight className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </motion.section>
    )
}
