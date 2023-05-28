import { classNames } from '@/utils';
import React, { memo } from 'react';

import TextareaAutoSize from './TextareaAutoSize';

import { InputNumber } from 'antd';
import { Field } from 'formik';

interface ITextInput {
	name: string;
	label?: string;
	type?: string;
	placeholder?: string;
	inputStyle?: string;
	containerStyle?: string;
	note?: string;
	require?: boolean;
	disabled?: boolean;
	onKeyDown?: (e: any) => void;
	inputClassName?: string;
}
const TextInput: React.FC<ITextInput> = ({
	label,
	name,
	type = 'text',
	placeholder,
	containerStyle = '',
	inputStyle = '',
	require = false,
	disabled = false,
	onKeyDown,
	inputClassName,
}) => {
	const renderInput = (field: any, form: any, meta: any) => {
		if (type === 'price') {
			return (
				<InputNumber
					value={field.value}
					formatter={(value) =>
						`${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
					}
					parser={(value = '') =>
						value!.replace(/\$\s?|(,*)/g, '') as any
					}
					onChange={(value) => form.setFieldValue(name, value)}
					className={classNames(
						'mt-2 w-full rounded-[12px] bg-black3 px-4 py-[14px] !text-base text-white',
						inputStyle,
						inputClassName,
						// fieldStyle,
						meta.touched && meta.error
							? 'border-error border border-solid'
							: 'border-none'
					)}
					onKeyDown={onKeyDown}
					controls={false}
					rootClassName="text-white"
				/>
			);
		}

		if (type === 'textarea') {
			return (
				<TextareaAutoSize
					type={type}
					placeholder={placeholder}
					{...field}
					disabled={disabled}
					className={classNames(
						'mt-2 w-full rounded-[12px] bg-black3 px-4 py-[14px] ',
						inputStyle,
						inputClassName,
						// fieldStyle,
						meta.touched && meta.error
							? 'border-error border border-solid'
							: 'border-none'
					)}
					onKeyDown={onKeyDown}
				/>
			);
		}

		return (
			<input
				type={type}
				placeholder={placeholder}
				{...field}
				disabled={disabled}
				className={classNames(
					'mt-2 w-full rounded-[12px] bg-black3 px-4 py-[14px]',
					inputStyle,
					// fieldStyle,
					inputClassName,
					meta.touched && meta.error
						? 'border-error border border-solid'
						: 'border-none'
				)}
				onKeyDown={onKeyDown}
			/>
		);
	};
	return (
		<div className={`flex flex-col ${containerStyle}`}>
			<label className="font-bold">
				{label} {require && <span className="text-error">*</span>}
			</label>
			<Field name={name}>
				{({
					field, // { name, value, onChange, onBlur }
					form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
					meta,
				}: any) => (
					<div className="w-full">
						{renderInput(field, form, meta)}

						{meta.touched && meta.error && (
							<div className="text-error mt-2">{meta.error}</div>
						)}
					</div>
				)}
			</Field>
		</div>
	);
};

export default memo(TextInput);
