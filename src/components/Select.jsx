/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon, LocationMarkerIcon, XIcon } from '@heroicons/react/solid'

function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

function CustomSelect({ addressList, placeholder, onChange, margin, roundedTop, roundedBottom }) {
	const [selected, setSelected] = useState(addressList)

	const changeSelected = (event) => {
		setSelected(event)
		onChange(event)
	}

	return (
		<Listbox value={selected} onChange={changeSelected}>
			{({ open }) => (
				<>
					<div className={`${margin} relative`}>
						<Listbox.Button className={`
						${roundedTop} ? ${roundedTop} : ''
						${roundedBottom} ? ${roundedBottom} : ''
						relative w-full bg-white border-b border-gray-300 pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-yellow-me focus:border-yellow-me sm:text-sm`} placeholder={placeholder}>
							<span className="flex items-center">
								<div className="flex-shrink-0 h-3 w-3 rounded-full bg-black" />
								<span className="ml-3 block truncate">{selected && selected.rout ? selected.rout : placeholder}</span>
							</span>
							<span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none divide-x-2">
								<XIcon className="h-5 w-5 text-gray-400 mr-1" aria-hidden="true" />
								<ChevronDownIcon className="h-8 w-8 text-gray-400" aria-hidden="true" />
							</span>
						</Listbox.Button>

						<Transition
							show={open}
							as={Fragment}
							leave="transition ease-in duration-100"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
								{addressList.map((person) => (
									<Listbox.Option
										key={person.id}
										className={({ active }) =>
											classNames(
												active ? 'text-white bg-yellow-me' : 'text-gray-900',
												'cursor-default select-none relative py-2 pl-3 pr-9'
											)
										}
										value={person}
									>
										{({ selected, active }) => (
											<>
												<div className="flex items-center">
													<LocationMarkerIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
													<span
														className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
													>
														{person.rout}
													</span>
												</div>

												{selected ? (
													<span
														className={classNames(
															active ? 'text-white' : 'text-yellow-me',
															'absolute inset-y-0 right-0 flex items-center pr-4'
														)}
													>
														<CheckIcon className="h-5 w-5" aria-hidden="true" />
													</span>
												) : null}
											</>
										)}
									</Listbox.Option>
								))}
							</Listbox.Options>
						</Transition>
					</div>
				</>
			)}
		</Listbox>
	)
}

export default CustomSelect