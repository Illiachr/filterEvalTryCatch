/* объявление функции filterByType принимает на вход тип и массив значений,
результат: из массива удаляются данные не соответствующие типу
eslint-disable-next-line no-unused-vars */
const filterByType = (type, ...values) => values.filter(value => typeof value === type),
	/* объявление функции hideAllResponseBlocks
	результат: скрывается блок div.dialog__response-block */
	hideAllResponseBlocks = () => {
		// получение элементов блока div.dialog__response-block в массив responseBlocksArray
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block'));
		// скрытие элементов блока div.dialog__response-block с помощью метода forEach
		responseBlocksArray.forEach(block => block.style.display = 'none');
	},
	/* объявление функции showResponseBlock
	принимает на вход селектор блока, текст сообщения, иконку сообщения
	результат: скрывается блок div.dialog__response-block */
	showResponseBlock = (blockSelector, msgText, spanSelector) => {
		// скрытие элементов блока div.dialog__response-block,
		// для того чтобы убрать предыдущий результат
		hideAllResponseBlocks();
		// отображение блока соответсвующего blockSelector
		document.querySelector(blockSelector).style.display = 'block';
		// если задан параметр spanSelector
		if (spanSelector) {
		// отображается элемент спан (spanSelector) с сообщением (msgText)
			document.querySelector(spanSelector).textContent = msgText;
		}
	},
	/* объявление функций showError, showResults
	принимают на вход текст сообщения, для вывода блока .dialog__response-block
	с помощью showResponseBlock
	результат showError: вывод сообщения об ошибке */
	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'),
	// результат showResults: вывод сообщения в случае успеха
	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'),
	/* функция showNoResults не принимает параметров
	результат showNoResults: вывод сообщения при отсутвии результатов */
	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'),
	// объявление функции tryFilterByType
	// принимает на вход тип данных и значения для фильтрации по типу данных
	// результат: скрывается блок div.dialog__response-block
	tryFilterByType = (type, values) => {
		// вызов функции showResults через конструкцию try catch
		try {
			/* исполнение строки кода (вызов функции filterByType)
			и объединение результирующего массива в строку,
			полученная строка сохраняется в переменную valuesArray */
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");
			/* в зависимости от длины сроки valuesArray переменной alertMsg
			присваивается тескт сообщения */
			const alertMsg = (valuesArray.length) ?
				`Данные с типом ${type}: ${valuesArray}` : // если длина стоки больше нуля
				`Отсутствуют данные типа ${type}`; // если длина стоки равна нулю
			showResults(alertMsg); // вывод сообщения об успехе с текстом alertMsg
		} catch (e) { // если при выполнении секции try произошла ошибка
			showError(`Ошибка: ${e}`); //выводится сообщение с именем и текстом ошибки e
		}
	};
// получение кнопки с идентификатором filter-btn
const filterButton = document.querySelector('#filter-btn');
// добавление слушателя события click на кнопку filterButton
filterButton.addEventListener('click', e => {
	// получение значения выбранного из списка типов с идентификатором type
	const typeInput = document.querySelector('#type');
	// получение значения фильтрации из поля ввода с идентификатором data
	const dataInput = document.querySelector('#data');
	// если в поле ввода data пустая строка
	if (dataInput.value === '') {
		// выводим специальное сообщение об ошибке пользователя с помощью метода setCustomValidity
		dataInput.setCustomValidity('Поле не должно быть пустым!');
		// вызов функции для отображения пустого блока результатов
		showNoResults();
	} else { // если поле data есть текст
		// удаляем сообщение об ошибек пользователя при вводе
		dataInput.setCustomValidity('');
		// перехват события
		e.preventDefault();
		/* вызов функции tryFilterByType, в параметр передяются значения
		из typeInput и dataInput без пробелов вокруг */
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim());
	}
});

