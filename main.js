const $notifications = document.getElementById('notifications')

let notifications = []

let key = 1

const createNotification = ({title = '', message = ''}) => {
    notifications = [...notifications, {
        key: key++,
        title,
        message
    }]

    update()
}

const update = () => {
    const $blocks = $notifications.querySelectorAll('.notifications__block')

    const forRemove = []
    const keys = []

    $blocks.forEach(item => {
        const key = item.getAttribute('key')
        keys.push(parseInt(key, 10))
        const notify = notifications.find(notifyItem => notifyItem.key == key)

        if (!notify) {
            forRemove.push(key)
        }
    })

    notifications.map(item => {
        if (keys.indexOf(item.key) < 0) {
            const html = `
                <div class="notifications__block" key="${item.key}">
                    <span class="title">${item.title}</span>
                    <span class="message">${item.message}</span>
                </div>
            `

            $notifications.insertAdjacentHTML('beforeend', html)
        }
    })

    for (let i = 0; i < $blocks.length; i++) {
        const key = $blocks[i].getAttribute('key');
        if (forRemove.indexOf(key) > 0) {
            $blocks[i].remove()
        }
    }
}


createNotification({title: 'Ошибка', message: 'Соединение с сервером потеряно'})