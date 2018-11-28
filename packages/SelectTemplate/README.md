**SelectTemplate**
-
На основе `react-select`

`import SelectTemplate from 'drcash-react-libs/public/packages/SelectTemplate';`

**Props:** 
-

1. options: array
    > Массив option'ов для селекта. Формат: `[{value: 5, label: 'Фильтр'}, ...]`
2. onChange: func, isRequired
    > Возвращает измененное значение select'а, а так же nameParams (если указан)
3. nameParams: string
    > Возвращается в функции `onChange((value, nameParams) => { ... })`, если был указан
4. className: string
    > className, по умолчанию select
5. clearable: bool
    > Добавляет кнопку для удаления значения из селекта. *По умолчанию: true*
6. setValue: number
    > Устанавливает значение при первом рендере компонента.
    >> Значения:
    > 1. 0 - не устанавливать (по умолчанию)
    > 2. 1 - установить
    > 3. 2 - установить случайное значение
7. searchable: bool
    > Делает select одновремено текстовым полем для поиска нужного значения. *По умолчанию: true`
8. placeholder: string
    > Устанавливает placeholder пока не выбрано значение. *По умолчанию: **'Выберите значение'***
9. isFetching: bool
    > Если установлен true, будет ожидать не пустого массива options. *По умолчанию: false*
10. disabled: bool
    > Блокирует select, если установлен true. *По умолчанию: false*
11. trackValue: bool
    > Отслеживает изменения значения извне. К примеру если устанавливается из redux'a.
12. multi: bool
    > Позволяет выбрать несколько значений. *По умолчанию: false*
13. creatable: bool
    > Если стоит true, возможно ввести и выбрать своё значение. *По умолчанию: false*