import { useState } from 'react';
import styles from './App.module.css';

export const App = () => {
	const [value, setValue] = useState('');
	const [list, setList] = useState([]);
	const [error, setError] = useState('');

	const isValueVaild = value.trim().length >= 3;

	const onInputButtonClick = () => {
		const prmt = window.prompt('Введите сообщение', value || '');
		if (prmt === null) return;
		const promptValue = prmt.trim();
		if (!promptValue) {
			setError('Введите не менее трех символов');
			return;
		}
		if (promptValue.length < 3) {
			setError('Должно быть не менее трех символов');
			return;
		}
		setError('');
		setValue(promptValue);
	};

	const onAddButtonClick = () => {
		const val = value.trim();
		if (val.length < 3) {
			setError('Должно быть не менее трех символов');
			return;
		}
		const id = Date.now();
		const updatedList = [...list, { id, value: val }];
		setList(updatedList);
		setError('');
		setValue('');
	};

	const handleClearButton = () => {
		setList('');
	};

	return (
		<>
			<div className={styles.app}>
				<h1 className={styles['page-heading']}>Ввод значения</h1>
				<p className={styles['no-margin-text']}>
					Текущее значение <code>value</code>: "
					<output className={styles['current-value']}>{value}</output>"
				</p>
				<div className={styles.error}>{error}</div>
				<div className={styles['buttons-container']}>
					<button className={styles.button} onClick={onInputButtonClick}>
						Ввести новое
					</button>
					<button
						className={styles.button}
						disabled={!isValueVaild}
						onClick={onAddButtonClick}
					>
						Добавить в список
					</button>
				</div>
				<div className={styles['list-container']}>
					<h2 className={styles['list-heading']}>Список:</h2>
					{list.length === 0 ? (
						<p className={styles['no-margin-text']}>
							Нет добавленных элементов
						</p>
					) : (
						<ul className={styles.list}>
							{list.map((el) => (
								<li key={el.id} className={styles['list-item']}>
									{el.value}
								</li>
							))}
						</ul>
					)}
				</div>
				<button onClick={handleClearButton}>Очистить список</button>
			</div>
		</>
	);
};
