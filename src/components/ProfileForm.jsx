import React from "react";

const ProfileForm = () => {
	return (
		<div
			className={'flex flex-wrap flex-col max-w-4xl w-full bg-white py-14 px-11 rounded-xl shadow-me-2'}>
			<h4
				className="font-bold text-4xl text-center">
				Профиль
			</h4>
			<p
				className="mt-3 text-lg text-gray-me text-center">
				Введите платежные данные
			</p>

			<div className="mt-12 flex justify-between -mx-12">

				<form onSubmit={handleForm} id="formProfile" className="flex flex-col w-1/2 px-12">
					<label
						className="flex flex-col justify-between font-bold cursor-pointer">
						<span>Имя владельца*</span>
						<input
							onChange={handleChangeCard}
							value={data.cardName}
							type="text"
							name="cardName"
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
							onChange={handleChangeCard}
							value={data.cardNumber}
							type="text"
							name="cardNumber"
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
								onChange={handleChangeCard}
								value={data.expiryDate}
								type="date"
								name="expiryDate"
								required
								placeholder="15/05/08"
								className="mt-1 block w-full border-b-2 border-gray-300 shadow-sm
						focus:outline-none focus:border-yellow-me focus:ring-yellow-me focus:placeholder-yellow-me
						placeholder:text-gray-me"/>
						</label>

						<label
							className="flex flex-col justify-between font-bold cursor-pointer mt-6">
							<span>CVC*</span>
							<input
								onChange={handleChangeCard}
								value={data.cvc}
								type="number"
								maxLength={3}
								name="cvc"
								required
								placeholder="667"
								min="000" max="999"
								className="mt-1 block w-full border-b-2 border-gray-300 shadow-sm
						focus:outline-none focus:border-yellow-me focus:ring-yellow-me focus:placeholder-yellow-me
						placeholder:text-gray-me"/>
						</label>
					</div>
				</form>


				<div className="flex flex-col w-1/2 px-12">
					<div className="bg-white px-7 py-5 rounded-xl shadow-me-3">
						<div className="flex justify-between items-center">
							<img src={miniLogo} alt="mini-logo" />
							<span className="text-xs">{data.expiryDate}</span>
						</div>
						<p className="text-xl mt-7">{data.cardNumber}</p>
						<div className="flex justify-between items-center mt-9">
							<div className="flex items-center">
								<img src={vector} alt="vector" />
								<span className="ml-2">{data.cardName}</span>
							</div>
							<img src={circle} alt="circle" />
						</div>
					</div>
				</div>

			</div>

			<button
				form="formProfile"
				type="submit"
				className="w-1/3 bg-yellow-me text-xl py-5 mt-10 rounded-full self-center">
				Сохранить
			</button>
		</div>
	)
}

export default ProfileForm