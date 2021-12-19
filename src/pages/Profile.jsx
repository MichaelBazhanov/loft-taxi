import React, { useState } from "react";

//img
import vector from '../assets/images/vector.svg'
import miniLogo from '../assets/images/mini-logo.svg'
import circle from '../assets/images/circle.svg'

function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

const Profile = ({ navigate }) => {
	const [state, setState] = useState({ active: false })

	const handleChange = (active) => {
		setState({ ...state, 'active': active })
	}

	const { active } = state

	return (
		<div className="bg-map bg-center relative">
			<div className="absolute inset-0 bg-black-me opacity-30"></div>
			<div className="container mx-auto h-screen ">
				<div className="flex justify-center items-center relative w-full h-full">

					<div
						className={classNames(active ? 'hidden' : '', 'flex flex-wrap flex-col max-w-4xl w-full bg-white py-14 px-11 rounded-xl shadow-me-2')}>
						<h4
							className="font-bold text-4xl text-center">
							Профиль
						</h4>
						<p
							className="mt-3 text-lg text-gray-me text-center">
							Ввдеите платежные данные
						</p>

						<div className="mt-12 flex justify-between -mx-12">
							<div className="flex flex-col w-1/2 px-12">
								<label
									className="flex flex-col justify-between font-bold cursor-pointer">
									<span>Имя владельца*</span>
									<input
										// onChange={handleChange}
										// value={text}
										type="text"
										name="text"
										required
										placeholder="Loft"
										className="mt-1 block w-full border-b-2 border-gray-300 shadow-sm
										focus:outline-none focus:border-yellow-me focus:ring-yellow-me focus:placeholder-yellow-me
										placeholder:text-gray-me"/>
								</label>

								<label
									className="flex flex-col justify-between font-bold cursor-pointer mt-6">
									<span>Номер карты*</span>
									<input
										// onChange={handleChange}
										// value={number}
										type="number"
										name="number"
										required
										placeholder="0000 0000 0000 0000"
										className="mt-1 block w-full border-b-2 border-gray-300 shadow-sm
										focus:outline-none focus:border-yellow-me focus:ring-yellow-me focus:placeholder-yellow-me
										placeholder:text-gray-me"/>
								</label>

								<div className="flex">
									<label
										className="flex flex-col justify-between font-bold cursor-pointer mt-6">
										<span>MM/YY*</span>
										<input
											// onChange={handleChange}
											// value={date}
											type="date"
											name="date"
											required
											placeholder="05/08"
											className="mt-1 block w-full border-b-2 border-gray-300 shadow-sm
										focus:outline-none focus:border-yellow-me focus:ring-yellow-me focus:placeholder-yellow-me
										placeholder:text-gray-me"/>
									</label>

									<label
										className="flex flex-col justify-between font-bold cursor-pointer mt-6">
										<span>CVC*</span>
										<input
											// onChange={handleChange}
											// value={date}
											type="number"
											name="number"
											required
											placeholder="667"
											className="mt-1 block w-full border-b-2 border-gray-300 shadow-sm
										focus:outline-none focus:border-yellow-me focus:ring-yellow-me focus:placeholder-yellow-me
										placeholder:text-gray-me"/>
									</label>
								</div>
							</div>
							<div className="flex flex-col w-1/2 px-12">
								<div className="bg-white px-7 py-5 rounded-xl shadow-me-3">
									<div className="flex justify-between items-center">
										<img src={miniLogo} alt="mini-logo" />
										<span className="text-xs">05/08</span>
									</div>
									<p className="text-xl mt-7">5545    2300    3432    4521</p>
									<div className="flex justify-between items-center mt-9">
										<img src={vector} alt="vector" />
										<img src={circle} alt="circle" />
									</div>
								</div>
							</div>
						</div>

						<button
							onClick={() => { handleChange(true) }}
							type="button" className="w-1/3 bg-yellow-me text-xl py-5 mt-10 rounded-full self-center">
							Сохранить
						</button>
					</div>

					<div
						className={classNames(active ? '' : 'hidden', 'flex flex-wrap flex-col max-w-4xl w-full bg-white py-14 px-11 rounded-xl shadow-me-2')}
					>
						<h4 className="font-bold text-4xl text-center">Профиль</h4>
						<p
							className="mt-3 text-lg text-gray-me text-center">
							Платёжные данные обновлены. Теперь вы можете заказывать такси.
						</p>
						<button
							onClick={() => { navigate('map') }}
							type="button"
							className="max-w-xs w-full bg-yellow-me text-xl py-5 mt-10 rounded-full self-center">
							Перейти на карту
						</button>
					</div>

				</div>
			</div>
		</div>
	)
}

export default Profile