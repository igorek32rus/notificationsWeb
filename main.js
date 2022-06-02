const $notifications = document.getElementById('notifications')

let notifications = []

let key = 1

const createNotification = ({title = '', message = '', time = 3}) => {
    const newNotification = {
        key,
        title,
        message
    }

    notifications = [...notifications, newNotification]

    key++

    update()

    const idTimer = setTimeout(() => {
        removeNotification(newNotification.key)
    }, time * 1000);
}

const removeNotification = (key) => {
    notifications = notifications.filter(item => item.key !== key)
    update()
}

const update = () => {
    const $blocks = $notifications.querySelectorAll('.notifications__block')

    const forRemove = []
    const keys = []

    $blocks.forEach(item => {
        const key = item.getAttribute('key')
        keys.push(parseInt(key, 10))
        const notify = notifications.find(notifyItem => notifyItem.key === parseInt(key, 10))

        if (!notify) {
            forRemove.push(parseInt(key, 10))
        }
    })

    notifications.map(item => {
        if (keys.indexOf(item.key) === -1) {
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
        if (forRemove.indexOf(parseInt(key, 10)) > -1) {
            $blocks[i].remove()
        }
    }
}


createNotification({title: 'Ошибка', message: 'Соединение с сервером потеряно'})