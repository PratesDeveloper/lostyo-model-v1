-- Lua Script para dimensionar o Frame principal
local GuiService = game:GetService("GuiService")
local insetY = GuiService:GetGuiInset().Y

-- 1. Define a posição Y para começar logo abaixo da TopBar
script.Parent.Position = UDim2.new(0, 0, 0, insetY)

-- 2. Define o tamanho para preencher 100% da largura (Scale X = 1)
-- e 100% da altura (Scale Y = 1) menos o espaço da TopBar (Offset Y = -insetY)
script.Parent.Size = UDim2.new(1, 0, 1, -insetY)