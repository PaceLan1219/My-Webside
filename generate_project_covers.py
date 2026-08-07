from PIL import Image, ImageDraw, ImageFont
import os


# ==========================
# Configuration
# ==========================

OUTPUT_DIR = r"D:\My Webside\assets\images\projects"

WIDTH = 1200
HEIGHT = 800


# ==========================
# Fonts
# ==========================

def load_font(size):
    fonts = [
        "C:/Windows/Fonts/arial.ttf",
        "C:/Windows/Fonts/segoeui.ttf"
    ]

    for f in fonts:
        if os.path.exists(f):
            return ImageFont.truetype(f, size)

    return ImageFont.load_default()


TITLE_FONT = load_font(70)
SUB_FONT = load_font(35)
TEXT_FONT = load_font(28)
CODE_FONT = load_font(25)


# ==========================
# Create base image
# ==========================

def create_background():

    img = Image.new(
        "RGB",
        (WIDTH, HEIGHT),
        (15, 20, 35)
    )

    draw = ImageDraw.Draw(img)

    # grid
    for x in range(0, WIDTH, 60):
        draw.line(
            (x,0,x,HEIGHT),
            fill=(30,40,60),
            width=1
        )

    for y in range(0, HEIGHT, 60):
        draw.line(
            (0,y,WIDTH,y),
            fill=(30,40,60),
            width=1
        )

    return img


# ==========================
# Card helpers
# ==========================

def draw_window(draw, x, y, w, h):

    draw.rounded_rectangle(
        (x,y,x+w,y+h),
        radius=20,
        fill=(30,40,60),
        outline=(90,110,150),
        width=3
    )

    draw.ellipse(
        (x+20,y+20,x+40,y+40),
        fill=(220,80,80)
    )

    draw.ellipse(
        (x+50,y+20,x+70,y+40),
        fill=(220,180,70)
    )

    draw.ellipse(
        (x+80,y+20,x+100,y+40),
        fill=(80,200,120)
    )


# ==========================
# PACE Master
# ==========================

def create_pace_master():

    img = create_background()
    draw = ImageDraw.Draw(img)

    draw.text(
        (70,70),
        "PACE_Master",
        font=TITLE_FONT,
        fill=(240,240,255)
    )

    draw.text(
        (75,160),
        "AI English Learning System",
        font=SUB_FONT,
        fill=(120,220,255)
    )


    draw.text(
        (90,260),
        "🥝 Kiwi AI Assistant",
        font=TEXT_FONT,
        fill=(255,255,255)
    )


    draw_window(
        draw,
        90,
        340,
        500,
        300
    )

    code = [
        "Vocabulary Module",
        "Grammar Academy",
        "Challenge Centre",
        "Dashboard",
        "AI Learning Loop"
    ]

    y=400

    for line in code:
        draw.text(
            (130,y),
            line,
            font=CODE_FONT,
            fill=(180,220,255)
        )
        y+=40


    img.save(
        os.path.join(
            OUTPUT_DIR,
            "pace_master.png"
        )
    )


# ==========================
# Portfolio V6
# ==========================

def create_portfolio():

    img=create_background()
    draw=ImageDraw.Draw(img)


    draw.text(
        (70,70),
        "Portfolio V6.0",
        font=TITLE_FONT,
        fill=(255,255,255)
    )


    draw.text(
        (75,160),
        "Modern Personal Website",
        font=SUB_FONT,
        fill=(120,220,255)
    )


    draw_window(
        draw,
        120,
        300,
        900,
        330
    )


    items=[
        "Home Page",
        "Projects Gallery",
        "Certificates",
        "Design System",
        "Responsive UI"
    ]

    y=390

    for item in items:
        draw.text(
            (170,y),
            item,
            font=TEXT_FONT,
            fill=(230,230,230)
        )
        y+=45


    img.save(
        os.path.join(
            OUTPUT_DIR,
            "portfolio_v6.png"
        )
    )


# ==========================
# Python Projects
# ==========================

def create_python_projects():

    img=create_background()
    draw=ImageDraw.Draw(img)


    draw.text(
        (70,70),
        "Python Projects",
        font=TITLE_FONT,
        fill=(255,255,255)
    )


    draw.text(
        (75,160),
        "Programming & Automation",
        font=SUB_FONT,
        fill=(120,220,255)
    )


    draw_window(
        draw,
        100,
        300,
        850,
        350
    )


    code=[
        ">>> python main.py",
        "",
        "import AI",
        "import Database",
        "import Automation",
        "System Running..."
    ]


    y=390

    for line in code:

        draw.text(
            (150,y),
            line,
            font=CODE_FONT,
            fill=(170,255,170)
        )

        y+=45


    img.save(
        os.path.join(
            OUTPUT_DIR,
            "python_projects.png"
        )
    )


# ==========================
# Main
# ==========================

if __name__ == "__main__":

    os.makedirs(
        OUTPUT_DIR,
        exist_ok=True
    )

    create_pace_master()
    create_portfolio()
    create_python_projects()


    print("✅ Project cover images generated successfully!")