import React, { Fragment, useEffect } from "react";
import { Navbar } from ".";
import { useCategory, useDepot, useSupplier } from "@/context";
import { useAxiosPrivate } from "@/hooks";
import { AppSidebar } from "../app-sidebar";
import { useErrorHandler } from "@/hooks";

const API_ENDPOINT = 'depot'

const AuthOutlet = ({ children }: { children: React.ReactNode }) => {

	const errorHandler = useErrorHandler()
	const { setDepots } = useDepot()
	const { setSuppliers } = useSupplier()
	const { setCategories } = useCategory()
	const axios = useAxiosPrivate()


	useEffect(() => {
		axios.get(API_ENDPOINT).then((res) => {
			if (res && res.data && res.status && res.status === 200) {
				setDepots([...res.data])
			}
		}).catch(error => {
			if (error.response && error.response.status === 401) {
				localStorage.removeItem("token")
				window.location.reload()
			}
			errorHandler(error)
		})

		axios.get("/supplier").then((res) => {
			if (res && res.data && res.status && res.status === 200) {
				setSuppliers([...res.data])
			}
		}).catch(error => {
			errorHandler(error)
		})

		axios.get("/category").then((res) => {
			if (res && res.data && res.status && res.status === 200) {
				setCategories([...res.data])
			}
		}).catch(error => {
			errorHandler(error)
		})
	}, [])

	return (
		<Fragment>
			<AppSidebar />
			<main className="flex flex-col w-auto flex-grow p-2 overflow-x-hidden overflow-y-auto">
				<Navbar />
				<div className="flex flex-col flex-grow my-4">
					{children}
				</div>
			</main>
		</Fragment>
	)
}

export default AuthOutlet