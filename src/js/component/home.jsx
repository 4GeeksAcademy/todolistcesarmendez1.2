import React, { act, useEffect, useState } from "react";



//create your first component
const Home = () => {
	const [lista, setLista] = useState([])
	const [tarea, setTarea] = useState("")
	useEffect(() => {
		gettodo()
	}, [])
	const gettodo = async () => {
		try {
			const datos = await fetch("https://playground.4geeks.com/todo/users/cesar")
			const datos2 = await datos.json()
			setLista(datos2.todos);
		}
		catch (error) {
			console.log("datos incompletos", error)
		}
	}
	const addtodo = async () => {
		try {
			const usuario = await fetch("https://playground.4geeks.com/todo/todos/cesar", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					"label": tarea,
					"done": false
				})
			})
			const data = await usuario.json()
			setLista([...lista, data]);
		}
		catch (error) {
			console.log("datos incompletos", error)
		}
	}
	const agregartarea = () => {
		if (tarea.trim() === "") {
			return
		}
		addtodo()
		gettodo()
		setLista([...lista, tarea]);
		setTarea("")
	}
	const imputTarea = (e) => {
		setTarea(e.target.value)
	}
	const deletetodo = async (id) => {
		try {
			const response = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
				method: "DELETE"

			})
			return response.ok

		}
		catch (error) {
			console.log("no se pudo eliminar la tarea", error)
		}
	}
	const deletetarea = async (item, index) => {
		try {
			const result = await deletetodo(item.id)
			if (result) {
				const nuevalista = lista.filter((_, i) => i !== index)
				setLista(nuevalista)

			}
			else {
				console.log("no se pudo eliminar la tarea")
			}
		} catch (error) {
			console.error("no se pudo eliminar la tarea")
		}
	}
	return (
		<div className="text-center container">
			<h1 className="text-center mt-5">LISTA DE TAREAS CESAR</h1>
			<div>
				<input value={tarea} onChange={imputTarea} type="text"></input>
				<button className="text-success" onClick={agregartarea}>Agregar Tarea</button>
			</div>
			<div className="d-flex justify-content-center">
				<div className="card" style={{ width: "18rem" }}>
					<ol className="list-group list-group-flush">

						{lista.map((item, index) => (<li className="d-flex justify-content-evenly list-group-item" key={index}>{item.label} <button className="text-danger" onClick={() => deletetarea(item, index)}>X</button></li>))}
					</ol>
				</div>
			</div>
			<p>Cantidad de Tareas: {lista.length}</p>

		</div>
	);
};

export default Home;
